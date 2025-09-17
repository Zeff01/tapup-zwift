"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllRefundRequests, updateRefundRequestStatus, processRefund } from "@/lib/firebase/actions/order.action";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { Loader2, CheckCircle, XCircle, AlertCircle, Clock, DollarSign } from "lucide-react";

interface RefundRequest {
  id: string;
  orderId: string;
  userId: string;
  orderData: {
    totalAmount: number;
    items: any[];
    paymentMethod: string;
  };
  reason: string;
  refundMethod: string;
  status: "Pending" | "Approved" | "Rejected";
  requestedAt: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  adminNotes?: string;
}

export default function RefundRequestsPage() {
  const [selectedRequest, setSelectedRequest] = useState<RefundRequest | null>(null);
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const queryClient = useQueryClient();

  const { data: refundRequests = [], isLoading } = useQuery({
    queryKey: ["admin-refund-requests"],
    queryFn: getAllRefundRequests,
  });

  const processMutation = useMutation({
    mutationFn: async ({ approved }: { approved: boolean }) => {
      if (!selectedRequest) return;
      
      // Update refund request status
      await updateRefundRequestStatus(
        selectedRequest.id,
        approved ? "Approved" : "Rejected",
        adminNotes
      );
      
      // Process the refund in the order
      return await processRefund(
        selectedRequest.orderId,
        approved,
        adminNotes,
        transactionId
      );
    },
    onSuccess: (result) => {
      if (result?.success) {
        toast.success("Refund request processed successfully");
        queryClient.invalidateQueries({ queryKey: ["admin-refund-requests"] });
        setShowProcessModal(false);
        resetForm();
      } else {
        toast.error(result?.error || "Failed to process refund");
      }
    },
    onError: () => {
      toast.error("Failed to process refund request");
    }
  });

  const resetForm = () => {
    setSelectedRequest(null);
    setAdminNotes("");
    setTransactionId("");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case "Rejected":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Refund Requests</h1>
        <p className="text-gray-500">Manage customer refund requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Requests</p>
              <p className="text-2xl font-bold">{refundRequests.length}</p>
            </div>
            <DollarSign className="h-8 w-8 text-gray-400" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {refundRequests.filter(r => r.status === "Pending").length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-yellow-400" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Approved</p>
              <p className="text-2xl font-bold text-green-600">
                {refundRequests.filter(r => r.status === "Approved").length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Rejected</p>
              <p className="text-2xl font-bold text-red-600">
                {refundRequests.filter(r => r.status === "Rejected").length}
              </p>
            </div>
            <XCircle className="h-8 w-8 text-red-400" />
          </div>
        </Card>
      </div>

      {/* Refund Requests Table */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2">Order ID</th>
                <th className="text-left py-3 px-2">Customer</th>
                <th className="text-left py-3 px-2">Amount</th>
                <th className="text-left py-3 px-2">Reason</th>
                <th className="text-left py-3 px-2">Method</th>
                <th className="text-left py-3 px-2">Requested</th>
                <th className="text-left py-3 px-2">Status</th>
                <th className="text-left py-3 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {refundRequests.map((request) => (
                <tr key={request.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2">
                    <span className="font-mono text-sm">
                      {request.orderId.slice(-8).toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-sm">{request.userId.slice(-8)}</td>
                  <td className="py-3 px-2 font-medium">
                    ₱{request.orderData.totalAmount.toFixed(2)}
                  </td>
                  <td className="py-3 px-2 text-sm max-w-xs truncate">
                    {request.reason}
                  </td>
                  <td className="py-3 px-2 text-sm">{request.refundMethod}</td>
                  <td className="py-3 px-2 text-sm">
                    {format(request.requestedAt, "MMM dd, yyyy")}
                  </td>
                  <td className="py-3 px-2">{getStatusBadge(request.status)}</td>
                  <td className="py-3 px-2">
                    {request.status === "Pending" ? (
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedRequest(request);
                          setShowProcessModal(true);
                        }}
                      >
                        Process
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedRequest(request);
                          setShowProcessModal(true);
                        }}
                      >
                        View
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {refundRequests.length === 0 && (
          <div className="text-center py-8">
            <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">No refund requests found</p>
          </div>
        )}
      </Card>

      {/* Process Refund Modal */}
      <Dialog open={showProcessModal} onOpenChange={setShowProcessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedRequest?.status === "Pending" ? "Process" : "View"} Refund Request
            </DialogTitle>
            <DialogDescription>
              Order #{selectedRequest?.orderId.slice(-8).toUpperCase()}
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4 py-4">
              <div>
                <p className="text-sm text-gray-500">Refund Amount</p>
                <p className="font-semibold">₱{selectedRequest.orderData.totalAmount.toFixed(2)}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Reason</p>
                <p className="text-sm">{selectedRequest.reason}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Refund Method</p>
                <p className="text-sm">{selectedRequest.refundMethod}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="text-sm">{selectedRequest.orderData.paymentMethod}</p>
              </div>

              {selectedRequest.status === "Pending" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="transactionId">Transaction ID (for approved refunds)</Label>
                    <Input
                      id="transactionId"
                      placeholder="Enter refund transaction ID"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adminNotes">Admin Notes</Label>
                    <Textarea
                      id="adminNotes"
                      placeholder="Add notes about this refund decision..."
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      rows={3}
                    />
                  </div>
                </>
              )}

              {selectedRequest.adminNotes && (
                <div>
                  <p className="text-sm text-gray-500">Admin Notes</p>
                  <p className="text-sm">{selectedRequest.adminNotes}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            {selectedRequest?.status === "Pending" ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => processMutation.mutate({ approved: false })}
                  disabled={processMutation.isPending}
                >
                  {processMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => processMutation.mutate({ approved: true })}
                  disabled={processMutation.isPending || !adminNotes.trim()}
                >
                  {processMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </>
                  )}
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={() => setShowProcessModal(false)}>
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}