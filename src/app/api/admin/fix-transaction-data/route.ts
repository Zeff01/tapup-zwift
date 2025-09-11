import { NextRequest, NextResponse } from "next/server";
import { collection, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { firebaseDb } from "@/lib/firebase/firebase";
import { authCurrentUserv2 } from "@/lib/firebase/auth";
import { USER_ROLE_ENUMS } from "@/constants";

export async function POST(req: NextRequest) {
  try {
    // Verify admin access
    const auth = await authCurrentUserv2();
    if (!auth || auth.role !== USER_ROLE_ENUMS.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action } = await req.json();
    
    if (action === "fix-statuses") {
      // Update all "to-ship" statuses to "processing"
      const transactionsRef = collection(firebaseDb, "transactions");
      const toShipQuery = query(transactionsRef, where("status", "==", "to-ship"));
      const snapshot = await getDocs(toShipQuery);
      
      let updatedCount = 0;
      const updatePromises = snapshot.docs.map(async (doc) => {
        await updateDoc(doc.ref, { 
          status: "processing",
          updatedAt: new Date().toISOString()
        });
        updatedCount++;
      });
      
      await Promise.all(updatePromises);
      
      // Also check for other non-standard statuses
      const allTransactions = await getDocs(transactionsRef);
      const nonStandardStatuses = new Set<string>();
      const statusUpdatePromises: Promise<void>[] = [];
      
      allTransactions.docs.forEach((doc) => {
        const data = doc.data();
        const validStatuses = ["pending", "processing", "completed", "cancelled"];
        
        if (data.status && !validStatuses.includes(data.status)) {
          nonStandardStatuses.add(data.status);
          
          // Map old statuses to new ones
          let newStatus = "processing";
          if (data.status === "delivered" || data.status === "shipping") {
            newStatus = "completed";
          }
          
          statusUpdatePromises.push(
            updateDoc(doc.ref, { 
              status: newStatus,
              updatedAt: new Date().toISOString()
            })
          );
        }
      });
      
      await Promise.all(statusUpdatePromises);
      
      return NextResponse.json({
        success: true,
        message: `Updated ${updatedCount} 'to-ship' transactions to 'processing'`,
        nonStandardStatuses: Array.from(nonStandardStatuses),
        additionalUpdates: statusUpdatePromises.length
      });
    }
    
    if (action === "fix-missing-customers") {
      const transactionsRef = collection(firebaseDb, "transactions");
      const allTransactions = await getDocs(transactionsRef);
      
      let deletedCount = 0;
      let fixedCount = 0;
      const problematicTransactions: any[] = [];
      
      for (const docSnapshot of allTransactions.docs) {
        const data = docSnapshot.data();
        const hasReceiver = data.receiver && 
                          (data.receiver.customerName || 
                           data.receiver.customerEmail || 
                           data.receiver.customerId);
        
        const hasUserId = data.user_id || data.userId;
        const hasItems = data.items && data.items.length > 0;
        const hasCards = data.cards && data.cards.length > 0;
        
        if (!hasReceiver) {
          // Check if we can fix it with existing data
          if (hasUserId && (hasItems || hasCards)) {
            // Try to construct receiver from other fields
            const receiver = {
              customerId: data.userId || data.user_id || "",
              customerName: data.customerName || "Unknown Customer",
              customerEmail: data.customerEmail || data.email || "",
              customerPhone: data.customerPhone || data.phone || "",
              customerAddress: data.customerAddress || data.address || ""
            };
            
            await updateDoc(docSnapshot.ref, { 
              receiver,
              updatedAt: new Date().toISOString()
            });
            fixedCount++;
          } else {
            // No way to recover, delete or log
            problematicTransactions.push({
              id: docSnapshot.id,
              data: {
                userId: data.userId || data.user_id,
                amount: data.amount,
                status: data.status,
                createdAt: data.createdAt,
                hasItems: hasItems,
                hasCards: hasCards
              }
            });
            
            // Delete if it's truly empty (no items, no amount, no user)
            if (!hasUserId && !hasItems && !hasCards && (!data.amount || data.amount === 0)) {
              await deleteDoc(docSnapshot.ref);
              deletedCount++;
            }
          }
        }
      }
      
      return NextResponse.json({
        success: true,
        message: "Customer data fix completed",
        fixedCount,
        deletedCount,
        problematicTransactions: problematicTransactions.slice(0, 10), // Limit to first 10
        totalProblematic: problematicTransactions.length
      });
    }
    
    if (action === "analyze") {
      // Just analyze without making changes
      const transactionsRef = collection(firebaseDb, "transactions");
      const allTransactions = await getDocs(transactionsRef);
      
      const analysis = {
        total: allTransactions.size,
        byStatus: {} as Record<string, number>,
        missingReceiver: 0,
        missingUserId: 0,
        missingItems: 0,
        emptyTransactions: 0
      };
      
      allTransactions.docs.forEach((doc) => {
        const data = doc.data();
        
        // Count by status
        const status = data.status || "undefined";
        analysis.byStatus[status] = (analysis.byStatus[status] || 0) + 1;
        
        // Check for missing data
        if (!data.receiver || !data.receiver.customerName) {
          analysis.missingReceiver++;
        }
        if (!data.user_id && !data.userId) {
          analysis.missingUserId++;
        }
        if ((!data.items || data.items.length === 0) && (!data.cards || data.cards.length === 0)) {
          analysis.missingItems++;
        }
        if (!data.user_id && !data.userId && !data.items && !data.cards && !data.amount) {
          analysis.emptyTransactions++;
        }
      });
      
      return NextResponse.json({
        success: true,
        analysis
      });
    }
    
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error fixing transaction data:", error);
    return NextResponse.json(
      { error: "Failed to fix transaction data" },
      { status: 500 }
    );
  }
}