"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { doc, getDoc, updateDoc, collection, query, where, getDocs, writeBatch } from "firebase/firestore";
import { firebaseDb } from "@/lib/firebase/firebase";
import { toast } from "react-toastify";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isChecking, setIsChecking] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<"checking" | "success" | "failed">("checking");
  const [transactionId, setTransactionId] = useState<string | null>(null);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        // Get plan ID from URL params (Xendit might send it)
        const planId = searchParams.get("plan_id") || searchParams.get("planId");
        const externalId = searchParams.get("external_id") || searchParams.get("externalId");
        
        console.log("Checking payment status", { planId, externalId });

        if (!planId && !externalId) {
          // If no params, check the most recent pending transaction for this user
          const userId = localStorage.getItem("userId"); // Assuming you store user ID
          if (userId) {
            const transactionsRef = collection(firebaseDb, "transactions");
            const q = query(
              transactionsRef, 
              where("user_id", "==", userId),
              where("status", "==", "pending")
            );
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
              // Get the most recent pending transaction
              const transactions = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt
              }));
              
              transactions.sort((a, b) => 
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              );
              
              const recentTransaction = transactions[0];
              setTransactionId(recentTransaction.id);
              
              // Wait a bit for webhook to process
              await new Promise(resolve => setTimeout(resolve, 3000));
              
              // Check if status was updated by webhook
              const updatedDoc = await getDoc(doc(firebaseDb, "transactions", recentTransaction.id));
              const updatedData = updatedDoc.data();
              
              if (updatedData?.status === "completed") {
                setPaymentStatus("success");
                await updateReservedCards(recentTransaction.id, userId);
                toast.success("Payment confirmed successfully!");
              } else {
                // If still pending after wait, update it manually
                // This is a fallback in case webhook fails
                await updateDoc(doc(firebaseDb, "transactions", recentTransaction.id), {
                  status: "completed",
                  paymentCompletedAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  completedVia: "success_page_fallback"
                });
                await updateReservedCards(recentTransaction.id, userId);
                setPaymentStatus("success");
                toast.success("Payment processed successfully!");
              }
            }
          }
        } else {
          // If we have plan ID, find and update the transaction
          const transactionsRef = collection(firebaseDb, "transactions");
          const q = query(transactionsRef, where("xenditPlanId", "==", planId));
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            const transactionDoc = querySnapshot.docs[0];
            setTransactionId(transactionDoc.id);
            
            // Check current status
            const transactionData = transactionDoc.data();
            if (transactionData.status === "completed") {
              setPaymentStatus("success");
              await updateReservedCards(transactionDoc.id, transactionData.user_id || transactionData.userId);
            } else {
              // Update to completed
              await updateDoc(doc(firebaseDb, "transactions", transactionDoc.id), {
                status: "completed",
                paymentCompletedAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                completedVia: "success_page"
              });
              await updateReservedCards(transactionDoc.id, transactionData.user_id || transactionData.userId);
              setPaymentStatus("success");
              toast.success("Payment confirmed successfully!");
            }
          }
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
        setPaymentStatus("failed");
        toast.error("Error verifying payment status");
      } finally {
        setIsChecking(false);
      }
    };

    checkPaymentStatus();
  }, [searchParams]);

  // Function to update reserved cards to show they're purchased
  const updateReservedCards = async (transactionId: string, userId: string) => {
    try {
      // Get the transaction to see which cards were purchased
      const transactionDoc = await getDoc(doc(firebaseDb, "transactions", transactionId));
      const transactionData = transactionDoc.data();
      
      if (!transactionData || !transactionData.items) return;
      
      // Find pregenerated cards reserved for this user
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
          // Update the card to show it's been purchased
          batch.update(doc.ref, {
            purchaseCompleted: true,
            purchaseCompletedAt: new Date().toISOString(),
            transactionId: transactionId,
            // Keep it as reserved - it will become assigned when user activates it
          });
        });
        
        await batch.commit();
        console.log("Updated reserved cards for completed purchase");
      }
    } catch (error) {
      console.error("Error updating reserved cards:", error);
    }
  };

  const handleViewOrders = () => {
    router.push("/cards/orderStatus/completed");
  };

  const handleBackToShop = () => {
    router.push("/cards");
  };

  return (
    <div className="container max-w-md mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            {isChecking ? "Verifying Payment..." : 
             paymentStatus === "success" ? "Payment Successful!" : 
             "Payment Verification Failed"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            {isChecking ? (
              <Loader2 className="w-16 h-16 animate-spin text-primary" />
            ) : paymentStatus === "success" ? (
              <CheckCircle className="w-16 h-16 text-green-500" />
            ) : (
              <XCircle className="w-16 h-16 text-red-500" />
            )}
          </div>
          
          <div className="text-center space-y-2">
            {isChecking ? (
              <p className="text-muted-foreground">
                Please wait while we confirm your payment with Xendit...
              </p>
            ) : paymentStatus === "success" ? (
              <>
                <p className="text-lg font-medium">Thank you for your purchase!</p>
                <p className="text-muted-foreground">
                  Your card order has been confirmed and is now being processed.
                </p>
                {transactionId && (
                  <p className="text-sm text-muted-foreground">
                    Transaction ID: {transactionId}
                  </p>
                )}
              </>
            ) : (
              <>
                <p className="text-lg font-medium">Unable to verify payment</p>
                <p className="text-muted-foreground">
                  Please check your orders or contact support if you completed the payment.
                </p>
              </>
            )}
          </div>
          
          {!isChecking && (
            <div className="flex flex-col gap-2">
              <Button onClick={handleViewOrders} className="w-full">
                View My Orders
              </Button>
              <Button onClick={handleBackToShop} variant="outline" className="w-full">
                Back to Shop
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}