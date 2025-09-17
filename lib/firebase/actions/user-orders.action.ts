"use server";

import { firebaseDb } from "@/lib/firebase/firebase";
import { collection, query, where, getDocs, doc, getDoc, orderBy } from "firebase/firestore";
import { Order } from "@/types/types";

interface UserOrderSummary {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    exists: boolean;
  };
  orders: {
    total: number;
    statuses: Record<string, number>;
    items: Order[];
  };
  transactions: {
    total: number;
    statuses: Record<string, number>;
    items: any[];
  };
}

export async function getUserOrderSummary(userId: string): Promise<UserOrderSummary> {
  try {
    // Initialize result
    const result: UserOrderSummary = {
      user: {
        id: userId,
        name: "Unknown",
        email: "Unknown",
        phone: "Unknown",
        exists: false
      },
      orders: {
        total: 0,
        statuses: {},
        items: []
      },
      transactions: {
        total: 0,
        statuses: {},
        items: []
      }
    };

    // Check if user exists
    const userRef = doc(firebaseDb, "user-account", userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      result.user = {
        id: userId,
        name: `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || userData.displayName || "No name",
        email: userData.email || "No email",
        phone: userData.phone || userData.phoneNumber || userData.mobile || "No phone",
        exists: true
      };
    }

    // Check orders collection
    const ordersRef = collection(firebaseDb, "orders");
    const ordersQuery = query(ordersRef, where("userId", "==", userId), orderBy("orderDate", "desc"));
    const ordersSnapshot = await getDocs(ordersQuery);
    
    if (!ordersSnapshot.empty) {
      ordersSnapshot.forEach((doc) => {
        const order = { ...doc.data(), orderId: doc.id } as Order;
        result.orders.items.push(order);
        result.orders.statuses[order.status] = (result.orders.statuses[order.status] || 0) + 1;
      });
      result.orders.total = ordersSnapshot.size;
    }

    // Check transactions collection with different field names
    const transactionsRef = collection(firebaseDb, "transactions");
    const allTransactions = new Map();
    
    // Check all possible user ID fields
    const fieldNames = ["userId", "uid", "user_id"];
    
    for (const fieldName of fieldNames) {
      const transQuery = query(transactionsRef, where(fieldName, "==", userId), orderBy("createdAt", "desc"));
      const transSnapshot = await getDocs(transQuery);
      
      transSnapshot.forEach((doc) => {
        allTransactions.set(doc.id, { id: doc.id, ...doc.data() });
      });
    }

    if (allTransactions.size > 0) {
      allTransactions.forEach((transaction) => {
        result.transactions.items.push(transaction);
        
        // Map transaction status to order status
        const mappedStatus = transaction.status === "pending" ? "Pending" :
                           transaction.status === "completed" ? "To Ship" :
                           transaction.status === "shipped" ? "To Receive" :
                           transaction.status === "delivered" ? "Delivered" :
                           transaction.status === "cancelled" ? "Cancelled" :
                           transaction.status === "to-return" ? "To Return/Refund" :
                           transaction.status;
                           
        result.transactions.statuses[mappedStatus] = (result.transactions.statuses[mappedStatus] || 0) + 1;
      });
      result.transactions.total = allTransactions.size;
    }

    return result;
  } catch (error) {
    console.error("Error fetching user order summary:", error);
    throw error;
  }
}

export async function getAllUsersWithOrders(): Promise<Array<{userId: string, name: string, orderCount: number}>> {
  try {
    const users: Map<string, {name: string, count: number}> = new Map();
    
    // Get all transactions
    const transactionsRef = collection(firebaseDb, "transactions");
    const transSnapshot = await getDocs(transactionsRef);
    
    // Count transactions per user
    transSnapshot.forEach((doc) => {
      const data = doc.data();
      const userId = data.userId || data.uid || data.user_id;
      if (userId) {
        const current = users.get(userId) || { name: "", count: 0 };
        users.set(userId, { name: current.name, count: current.count + 1 });
      }
    });
    
    // Get all orders
    const ordersRef = collection(firebaseDb, "orders");
    const ordersSnapshot = await getDocs(ordersRef);
    
    ordersSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.userId) {
        const current = users.get(data.userId) || { name: "", count: 0 };
        users.set(data.userId, { name: current.name, count: current.count + 1 });
      }
    });
    
    // Fetch user names
    const userIds = Array.from(users.keys());
    const userPromises = userIds.map(async (userId) => {
      try {
        const userDoc = await getDoc(doc(firebaseDb, "user-account", userId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const name = `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || 
                      userData.displayName || 
                      userData.email || 
                      "Unknown";
          users.set(userId, { name, count: users.get(userId)!.count });
        }
      } catch (e) {
        // User might not exist
      }
    });
    
    await Promise.all(userPromises);
    
    // Convert to array and sort by order count
    return Array.from(users.entries())
      .map(([userId, data]) => ({
        userId,
        name: data.name || "Unknown User",
        orderCount: data.count
      }))
      .sort((a, b) => b.orderCount - a.orderCount);
      
  } catch (error) {
    console.error("Error fetching users with orders:", error);
    return [];
  }
}