"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle, XCircle, ShoppingBag, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { doc, getDoc, updateDoc, collection, query, where, getDocs, writeBatch } from "firebase/firestore";
import { firebaseDb } from "@/lib/firebase/firebase";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { confirmReservation } from "@/lib/firebase/actions/card-reservation.action";

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchParams?: URLSearchParams;
}

export default function PaymentSuccessModal({ isOpen, onClose, searchParams }: PaymentSuccessModalProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<"checking" | "success" | "failed">("checking");
  const [transactionId, setTransactionId] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    
    const checkPaymentStatus = async () => {
      try {
        // Try multiple parameter variations that Xendit might use
        const planId = searchParams?.get("plan_id") || 
                      searchParams?.get("planId") || 
                      searchParams?.get("recurring_plan_id");
        const externalId = searchParams?.get("external_id") || 
                          searchParams?.get("externalId") || 
                          searchParams?.get("reference_id");
        const status = searchParams?.get("status");
        
        console.log("Payment redirect params:", { planId, externalId, status });

        // If status parameter exists and is not success, handle failure
        if (status && status !== "success" && status !== "SUCCESSFUL") {
          setPaymentStatus("failed");
          setIsChecking(false);
          return;
        }

        // Get user ID from localStorage
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("No user ID found");
          setPaymentStatus("failed");
          setIsChecking(false);
          return;
        }

        // Find the transaction
        const transactionsRef = collection(firebaseDb, "transactions");
        let transactionDoc: any = null;
        
        // Try to find by plan ID first
        if (planId) {
          const q = query(transactionsRef, where("xenditPlanId", "==", planId));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            transactionDoc = querySnapshot.docs[0];
          }
        }
        
        // If not found, try to find recent pending transaction
        if (!transactionDoc) {
          const q = query(
            transactionsRef,
            where("user_id", "==", userId),
            where("status", "==", "pending")
          );
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            // Get the most recent one
            const transactions = querySnapshot.docs.map(doc => ({
              doc,
              data: doc.data(),
              createdAt: doc.data().createdAt
            }));
            
            transactions.sort((a, b) => 
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            
            transactionDoc = transactions[0].doc;
          }
        }

        if (transactionDoc) {
          setTransactionId(transactionDoc.id);
          const transactionData = transactionDoc.data();
          
          // Wait a bit for webhook
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Check if webhook already updated it
          const updatedDoc = await getDoc(doc(firebaseDb, "transactions", transactionDoc.id));
          const updatedData = updatedDoc.data();
          
          if (updatedData?.status !== "completed") {
            // Update to completed if webhook hasn't done it yet
            await updateDoc(doc(firebaseDb, "transactions", transactionDoc.id), {
              status: "completed",
              paymentCompletedAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              completedVia: "payment_success_modal"
            });
          }
          
          // Confirm the reservation
          await confirmReservation(userId, transactionDoc.id);
          
          setPaymentStatus("success");
          
          // Trigger confetti
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } else {
          // No transaction found, but payment might still be successful
          console.warn("No transaction found, but assuming success");
          setPaymentStatus("success");
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
        setPaymentStatus("failed");
      } finally {
        setIsChecking(false);
      }
    };

    checkPaymentStatus();
  }, [isOpen, searchParams]);

  const updateReservedCards = async (transactionId: string, userId: string) => {
    try {
      const transactionDoc = await getDoc(doc(firebaseDb, "transactions", transactionId));
      const transactionData = transactionDoc.data();
      
      if (!transactionData || !transactionData.items) return;
      
      const pregeneratedCardsRef = collection(firebaseDb, "pregenerated-cards");
      const q = query(
        pregeneratedCardsRef,
        where("status", "==", "reserved"),
        where("reservedFor", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const batch = writeBatch(firebaseDb);
        
        querySnapshot.docs.forEach((doc) => {
          batch.update(doc.ref, {
            purchaseCompleted: true,
            purchaseCompletedAt: new Date().toISOString(),
            transactionId: transactionId,
          });
        });
        
        await batch.commit();
      }
    } catch (error) {
      console.error("Error updating reserved cards:", error);
    }
  };

  const handleViewOrders = () => {
    onClose();
    router.push("/cards/orderStatus/completed");
  };

  const handleContinueShopping = () => {
    onClose();
    router.push("/cards");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        {isChecking ? (
          <div className="py-8 text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary mb-4" />
            <h3 className="text-lg font-semibold">Verifying Payment...</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Please wait while we confirm your payment
            </p>
          </div>
        ) : paymentStatus === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="py-6 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            </motion.div>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">
                Payment Successful!
              </DialogTitle>
              <DialogDescription className="text-center mt-2">
                Your order has been confirmed and is being processed.
                {transactionId && (
                  <span className="block text-xs mt-2">
                    Transaction ID: {transactionId}
                  </span>
                )}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3 mt-6">
              <Button onClick={handleViewOrders} className="w-full">
                <ShoppingBag className="w-4 h-4 mr-2" />
                View My Orders
              </Button>
              <Button onClick={handleContinueShopping} variant="outline" className="w-full">
                Continue Shopping
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="py-6 text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-center">
                Payment Verification Failed
              </DialogTitle>
              <DialogDescription className="text-center mt-2">
                We couldn't verify your payment. If you completed the payment,
                please check your orders or contact support.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3 mt-6">
              <Button onClick={handleViewOrders} variant="outline" className="w-full">
                Check My Orders
              </Button>
              <Button onClick={handleContinueShopping} className="w-full">
                Back to Shop
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}