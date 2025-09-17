"use client";

import React, { useEffect, useState } from "react";
import { firebaseDb } from "@/lib/firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useUserContext } from "@/providers/user-provider";

interface OrderDebugInfo {
  id: string;
  status: string;
  userId?: string;
  uid?: string;
  user_id?: string;
  cancelledAt?: any;
  cancelReason?: string;
  refundStatus?: string;
  amount?: number;
  totalAmount?: number;
  createdAt?: any;
}

export default function OrdersDebugPage() {
  const { user } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [cancelledOrders, setCancelledOrders] = useState<OrderDebugInfo[]>([]);
  const [cancelledTransactions, setCancelledTransactions] = useState<OrderDebugInfo[]>([]);
  const [userOrders, setUserOrders] = useState<OrderDebugInfo[]>([]);
  const [statusCounts, setStatusCounts] = useState<{ orders: Record<string, number>, transactions: Record<string, number> }>({
    orders: {},
    transactions: {}
  });

  useEffect(() => {
    async function checkDatabase() {
      try {
        // Check orders collection for cancelled orders
        const ordersRef = collection(firebaseDb, "orders");
        const cancelledOrdersQuery = query(ordersRef, where("status", "==", "Cancelled"));
        const ordersSnapshot = await getDocs(cancelledOrdersQuery);
        
        const ordersData: OrderDebugInfo[] = [];
        ordersSnapshot.forEach((doc) => {
          ordersData.push({
            id: doc.id,
            ...doc.data()
          } as OrderDebugInfo);
        });
        setCancelledOrders(ordersData);

        // Check transactions collection for cancelled orders
        const transRef = collection(firebaseDb, "transactions");
        const cancelledTransQuery = query(transRef, where("status", "==", "cancelled"));
        const transSnapshot = await getDocs(cancelledTransQuery);
        
        const transData: OrderDebugInfo[] = [];
        transSnapshot.forEach((doc) => {
          transData.push({
            id: doc.id,
            ...doc.data()
          } as OrderDebugInfo);
        });
        setCancelledTransactions(transData);

        // Get all orders and transactions to count statuses
        const allOrdersSnapshot = await getDocs(ordersRef);
        const orderCounts: Record<string, number> = {};
        allOrdersSnapshot.forEach((doc) => {
          const status = doc.data().status || "No Status";
          orderCounts[status] = (orderCounts[status] || 0) + 1;
        });

        const allTransSnapshot = await getDocs(transRef);
        const transCounts: Record<string, number> = {};
        allTransSnapshot.forEach((doc) => {
          const status = doc.data().status || "No Status";
          transCounts[status] = (transCounts[status] || 0) + 1;
        });

        setStatusCounts({
          orders: orderCounts,
          transactions: transCounts
        });

        // Get current user's orders from both collections
        if (user?.uid) {
          const userOrdersData: OrderDebugInfo[] = [];
          
          // Check orders collection
          const userOrdersQuery1 = query(ordersRef, where("userId", "==", user.uid));
          const userOrdersSnapshot1 = await getDocs(userOrdersQuery1);
          userOrdersSnapshot1.forEach((doc) => {
            userOrdersData.push({
              id: doc.id,
              ...doc.data(),
              _source: "orders"
            } as OrderDebugInfo);
          });

          // Check transactions collection with different field names
          const userTransQuery1 = query(transRef, where("userId", "==", user.uid));
          const userTransQuery2 = query(transRef, where("uid", "==", user.uid));
          const userTransQuery3 = query(transRef, where("user_id", "==", user.uid));
          
          const [snap1, snap2, snap3] = await Promise.all([
            getDocs(userTransQuery1),
            getDocs(userTransQuery2),
            getDocs(userTransQuery3)
          ]);
          
          snap1.forEach((doc) => {
            userOrdersData.push({
              id: doc.id,
              ...doc.data(),
              _source: "transactions"
            } as OrderDebugInfo);
          });
          snap2.forEach((doc) => {
            if (!userOrdersData.find(o => o.id === doc.id)) {
              userOrdersData.push({
                id: doc.id,
                ...doc.data(),
                _source: "transactions"
              } as OrderDebugInfo);
            }
          });
          snap3.forEach((doc) => {
            if (!userOrdersData.find(o => o.id === doc.id)) {
              userOrdersData.push({
                id: doc.id,
                ...doc.data(),
                _source: "transactions"
              } as OrderDebugInfo);
            }
          });
          
          setUserOrders(userOrdersData);
        }
      } catch (error) {
        console.error("Error checking database:", error);
      } finally {
        setLoading(false);
      }
    }

    checkDatabase();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Orders Database Debug</h1>

      {/* Cancelled Orders */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Cancelled Orders in "orders" collection: {cancelledOrders.length}
        </h2>
        {cancelledOrders.length > 0 ? (
          <div className="space-y-4">
            {cancelledOrders.map((order) => (
              <div key={order.id} className="border rounded p-4">
                <p><strong>ID:</strong> {order.id}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>User ID:</strong> {order.userId || "N/A"}</p>
                <p><strong>Cancel Reason:</strong> {order.cancelReason || "N/A"}</p>
                <p><strong>Refund Status:</strong> {order.refundStatus || "N/A"}</p>
                <p><strong>Amount:</strong> ${order.totalAmount || order.amount || "N/A"}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No cancelled orders found in orders collection</p>
        )}
      </Card>

      {/* Cancelled Transactions */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Cancelled Orders in "transactions" collection: {cancelledTransactions.length}
        </h2>
        {cancelledTransactions.length > 0 ? (
          <div className="space-y-4">
            {cancelledTransactions.map((trans) => (
              <div key={trans.id} className="border rounded p-4">
                <p><strong>ID:</strong> {trans.id}</p>
                <p><strong>Status:</strong> {trans.status}</p>
                <p><strong>User ID:</strong> {trans.userId || trans.uid || trans.user_id || "N/A"}</p>
                <p><strong>Cancel Reason:</strong> {trans.cancelReason || "N/A"}</p>
                <p><strong>Refund Status:</strong> {trans.refundStatus || "N/A"}</p>
                <p><strong>Amount:</strong> ${trans.totalAmount || trans.amount || "N/A"}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No cancelled orders found in transactions collection</p>
        )}
      </Card>

      {/* Current User's Orders */}
      <Card className="p-6 mb-6 border-blue-500">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">
          Your Orders (User ID: {user?.uid}): {userOrders.length}
        </h2>
        {userOrders.length > 0 ? (
          <div className="space-y-4">
            {userOrders.map((order) => (
              <div key={order.id} className="border rounded p-4">
                <p><strong>ID:</strong> {order.id}</p>
                <p><strong>Status:</strong> {order.status} <span className="text-xs text-gray-500">(from {order._source})</span></p>
                <p><strong>User ID Field:</strong> {order.userId || order.uid || order.user_id}</p>
                <p><strong>Amount:</strong> ${order.totalAmount || order.amount || "N/A"}</p>
                {order.status === "cancelled" && (
                  <>
                    <p><strong>Cancel Reason:</strong> {order.cancelReason || "N/A"}</p>
                    <p><strong>Refund Status:</strong> {order.refundStatus || "N/A"}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No orders found for your user ID</p>
        )}
      </Card>

      {/* Status Distribution */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Status Distribution</h2>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Orders Collection:</h3>
            {Object.entries(statusCounts.orders).map(([status, count]) => (
              <div key={status} className="flex justify-between py-1">
                <span>{status}:</span>
                <span className="font-medium">{count}</span>
              </div>
            ))}
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Transactions Collection:</h3>
            {Object.entries(statusCounts.transactions).map(([status, count]) => (
              <div key={status} className="flex justify-between py-1">
                <span>{status}:</span>
                <span className="font-medium">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}