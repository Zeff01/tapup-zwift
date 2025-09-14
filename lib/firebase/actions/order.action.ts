// Order actions for Firebase

import { firebaseDb } from "@/lib/firebase/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { Order } from "@/types/types";

/**
 * Get all orders (admin only)
 * Note: Currently orders are stored as transactions in Firebase
 */
export async function getAllOrders(): Promise<Order[]> {
  try {
    // Try fetching from orders collection first
    const ordersRef = collection(firebaseDb, "orders");
    const ordersQuery = query(ordersRef, orderBy("orderDate", "desc"));
    const ordersSnapshot = await getDocs(ordersQuery);
    
    const orders: Order[] = [];
    
    // If we have orders in the orders collection
    if (!ordersSnapshot.empty) {
      ordersSnapshot.forEach((doc) => {
        const data = doc.data();
        orders.push({
          ...data,
          orderId: doc.id,
          orderDate: data.orderDate?.toDate() || new Date(),
        } as Order);
      });
      return orders;
    }
    
    // Otherwise, fetch from transactions collection and transform
    const transactionsRef = collection(firebaseDb, "transactions");
    const transQuery = query(transactionsRef, orderBy("createdAt", "desc"));
    const transSnapshot = await getDocs(transQuery);
    
    transSnapshot.forEach((doc) => {
      const data = doc.data();
      // Transform transaction to order format
      const order: Order = {
        orderId: data.orderId || doc.id,
        userId: data.userId,
        items: data.items || [],
        shippingInfo: data.shippingInfo || {
          recipientName: "Unknown",
          contactNumber: "Unknown",
          address: {
            city: "Unknown",
            street: "Unknown",
            unit: "",
            postalCode: "Unknown"
          }
        },
        deliveryOption: data.deliveryOption || {
          name: "Standard Delivery",
          shippingFee: 0,
          minDays: 3,
          maxDays: 7
        },
        orderDate: data.createdAt?.toDate() || new Date(),
        totalAmount: data.totalAmount || 0,
        status: data.status === "pending-payment" ? "Pending" : 
                data.status === "completed" ? "To Ship" : 
                data.status || "Pending",
        returnStatus: data.returnStatus
      };
      orders.push(order);
    });
    
    return orders;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return [];
  }
}

/**
 * Get orders by user ID
 * Note: Currently orders are stored as transactions in Firebase
 */
export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  try {
    if (!userId) {
      console.error("No userId provided");
      return [];
    }

    const orders: Order[] = [];

    // Try fetching from orders collection first
    try {
      const ordersRef = collection(firebaseDb, "orders");
      const ordersQuery = query(
        ordersRef,
        where("userId", "==", userId),
        orderBy("orderDate", "desc")
      );
      const ordersSnapshot = await getDocs(ordersQuery);
      
      if (!ordersSnapshot.empty) {
        ordersSnapshot.forEach((doc) => {
          const data = doc.data();
          orders.push({
            ...data,
            orderId: doc.id,
            orderDate: data.orderDate?.toDate() || new Date(),
          } as Order);
        });
        return orders;
      }
    } catch (e) {
      console.log("No orders collection or error querying orders:", e);
    }

    // Otherwise, fetch from transactions collection
    const transactionsRef = collection(firebaseDb, "transactions");
    const transQuery = query(
      transactionsRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const transSnapshot = await getDocs(transQuery);
    
    transSnapshot.forEach((doc) => {
      const data = doc.data();
      // Transform transaction to order format
      const order: Order = {
        orderId: data.orderId || doc.id,
        userId: data.userId,
        items: data.items || [],
        shippingInfo: data.shippingInfo || {
          recipientName: "Unknown",
          contactNumber: "Unknown",
          address: {
            city: "Unknown",
            street: "Unknown",
            unit: "",
            postalCode: "Unknown"
          }
        },
        deliveryOption: data.deliveryOption || {
          name: "Standard Delivery",
          shippingFee: 0,
          minDays: 3,
          maxDays: 7
        },
        orderDate: data.createdAt?.toDate() || new Date(),
        totalAmount: data.totalAmount || 0,
        status: data.status === "pending-payment" ? "Pending" : 
                data.status === "completed" ? "To Ship" : 
                data.status || "Pending",
        returnStatus: data.returnStatus
      };
      orders.push(order);
    });
    
    return orders;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }
}

/**
 * Get a single order by ID
 */
export async function getOrderById(orderId: string): Promise<Order | null> {
  try {
    const orderRef = doc(firebaseDb, "orders", orderId);
    const orderDoc = await getDoc(orderRef);
    
    if (!orderDoc.exists()) {
      return null;
    }
    
    const data = orderDoc.data();
    return {
      ...data,
      orderId: orderDoc.id,
      orderDate: data.orderDate?.toDate() || new Date(),
    } as Order;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
}

/**
 * Create a new order
 */
export async function createOrder(orderData: Omit<Order, "orderId">): Promise<string | null> {
  try {
    const ordersRef = collection(firebaseDb, "orders");
    const newOrderRef = doc(ordersRef);
    
    await setDoc(newOrderRef, {
      ...orderData,
      orderDate: Timestamp.fromDate(orderData.orderDate),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    
    return newOrderRef.id;
  } catch (error) {
    console.error("Error creating order:", error);
    return null;
  }
}

/**
 * Update an order
 */
export async function updateOrder(
  orderId: string,
  updates: Partial<Order>
): Promise<boolean> {
  try {
    const orderRef = doc(firebaseDb, "orders", orderId);
    
    await updateDoc(orderRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
    
    return true;
  } catch (error) {
    console.error("Error updating order:", error);
    return false;
  }
}

/**
 * Delete an order
 */
export async function deleteOrder(orderId: string): Promise<boolean> {
  try {
    const orderRef = doc(firebaseDb, "orders", orderId);
    await deleteDoc(orderRef);
    
    return true;
  } catch (error) {
    console.error("Error deleting order:", error);
    return false;
  }
}

/**
 * Update order status
 */
export async function updateOrderStatus(
  orderId: string,
  status: Order["status"],
  returnStatus?: Order["returnStatus"]
): Promise<boolean> {
  try {
    const orderRef = doc(firebaseDb, "orders", orderId);
    
    const updates: any = {
      status,
      updatedAt: Timestamp.now(),
    };
    
    if (returnStatus !== undefined) {
      updates.returnStatus = returnStatus;
    }
    
    await updateDoc(orderRef, updates);
    
    return true;
  } catch (error) {
    console.error("Error updating order status:", error);
    return false;
  }
}