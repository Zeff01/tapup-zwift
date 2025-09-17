"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertCircle, Loader2, CreditCard, Smartphone, Building2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestRefund } from "@/lib/firebase/actions/order.action";
import { toast } from "react-toastify";
import { Order } from "@/types/types";

interface RefundRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
  userId: string;
}

const refundReasons = [
  "Product not as described",
  "Defective or damaged product",
  "Never received the order",
  "Ordered by mistake",
  "Other reasons"
];

const refundMethods = [
  { value: "original", label: "Original Payment Method", icon: CreditCard },
  { value: "bank", label: "Bank Transfer", icon: Building2 },
  { value: "ewallet", label: "E-Wallet (GCash/Maya)", icon: Smartphone },
];

export function RefundRequestModal({ isOpen, onClose, order, userId }: RefundRequestModalProps) {
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [refundMethod, setRefundMethod] = useState("original");
  const queryClient = useQueryClient();

  const refundMutation = useMutation({
    mutationFn: async () => {
      const reason = selectedReason === "Other reasons" ? otherReason : selectedReason;
      const method = refundMethods.find(m => m.value === refundMethod)?.label || "Original Payment Method";
      return await requestRefund(order.orderId, userId, reason, method);
    },
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Refund request submitted successfully. We'll process it within 3-5 business days.");
        queryClient.invalidateQueries({ queryKey: ["user-orders", userId] });
        onClose();
      } else {
        toast.error(result.error || "Failed to submit refund request");
      }
    },
    onError: (error) => {
      toast.error("Failed to submit refund request. Please try again.");
      console.error("Refund request error:", error);
    }
  });

  const handleSubmit = () => {
    if (!selectedReason) {
      toast.error("Please select a reason for refund");
      return;
    }
    
    if (selectedReason === "Other reasons" && !otherReason.trim()) {
      toast.error("Please provide a reason for refund");
      return;
    }

    refundMutation.mutate();
  };

  // Calculate estimated refund amount
  const estimatedRefund = order.totalAmount;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request Refund</DialogTitle>
          <DialogDescription>
            Submit a refund request for Order #{order.orderId.slice(-8).toUpperCase()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Refund Amount Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Estimated Refund Amount: ₱{estimatedRefund.toFixed(2)}
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
              Processing time: 3-5 business days after approval
            </p>
          </div>

          {/* Reason Selection */}
          <div className="space-y-3">
            <Label>Reason for refund</Label>
            <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
              {refundReasons.map((reason) => (
                <div key={reason} className="flex items-center space-x-2">
                  <RadioGroupItem value={reason} id={reason} />
                  <Label
                    htmlFor={reason}
                    className="font-normal cursor-pointer flex-1"
                  >
                    {reason}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {selectedReason === "Other reasons" && (
            <div className="space-y-2">
              <Label htmlFor="otherReason">Please specify</Label>
              <Textarea
                id="otherReason"
                placeholder="Provide details about your refund request..."
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                rows={3}
                maxLength={200}
              />
              <p className="text-xs text-gray-500">
                {otherReason.length}/200 characters
              </p>
            </div>
          )}

          {/* Refund Method Selection */}
          <div className="space-y-3">
            <Label>Refund Method</Label>
            <RadioGroup value={refundMethod} onValueChange={setRefundMethod}>
              {refundMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div key={method.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={method.value} id={method.value} />
                    <Label
                      htmlFor={method.value}
                      className="font-normal cursor-pointer flex-1 flex items-center gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      {method.label}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          {/* Additional Info */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 flex gap-2">
            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm text-amber-700 dark:text-amber-400">
                Important Information:
              </p>
              <ul className="text-xs text-amber-600 dark:text-amber-500 space-y-0.5 list-disc list-inside">
                <li>Refunds are subject to review and approval</li>
                <li>You may be asked to provide additional information</li>
                <li>Approved refunds will be processed within 3-5 business days</li>
              </ul>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={refundMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={refundMutation.isPending || !selectedReason || 
                     (selectedReason === "Other reasons" && !otherReason.trim())}
          >
            {refundMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Request"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}