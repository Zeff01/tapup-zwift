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
import { AlertCircle, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "@/lib/firebase/actions/order.action";
import { toast } from "react-toastify";

interface CancelOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  userId: string;
}

const cancelReasons = [
  "Changed my mind",
  "Found a better price elsewhere",
  "Order by mistake",
  "Delivery time too long",
  "Other reasons"
];

export function CancelOrderModal({ isOpen, onClose, orderId, userId }: CancelOrderModalProps) {
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const queryClient = useQueryClient();

  const cancelOrderMutation = useMutation({
    mutationFn: async () => {
      const reason = selectedReason === "Other reasons" ? otherReason : selectedReason;
      return await cancelOrder(orderId, userId, reason);
    },
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Order cancelled successfully");
        queryClient.invalidateQueries({ queryKey: ["user-orders", userId] });
        onClose();
      } else {
        toast.error(result.error || "Failed to cancel order");
      }
    },
    onError: (error) => {
      toast.error("Failed to cancel order. Please try again.");
      console.error("Cancel order error:", error);
    }
  });

  const handleCancel = () => {
    if (!selectedReason) {
      toast.error("Please select a reason for cancellation");
      return;
    }
    
    if (selectedReason === "Other reasons" && !otherReason.trim()) {
      toast.error("Please provide a reason for cancellation");
      return;
    }

    cancelOrderMutation.mutate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cancel Order</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this order? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 flex gap-2">
            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700 dark:text-amber-400">
              Once cancelled, this order cannot be restored and you'll need to place a new order.
            </p>
          </div>

          <div className="space-y-3">
            <Label>Reason for cancellation</Label>
            <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
              {cancelReasons.map((reason) => (
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
                placeholder="Tell us why you're cancelling this order..."
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
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={cancelOrderMutation.isPending}
          >
            Keep Order
          </Button>
          <Button
            variant="destructive"
            onClick={handleCancel}
            disabled={cancelOrderMutation.isPending || !selectedReason || 
                     (selectedReason === "Other reasons" && !otherReason.trim())}
          >
            {cancelOrderMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cancelling...
              </>
            ) : (
              "Cancel Order"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}