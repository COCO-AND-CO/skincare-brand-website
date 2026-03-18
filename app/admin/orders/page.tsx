"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Order } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export default function OrdersAdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const snapshot = await getDocs(collection(db, "orders"));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
        // Sort by newest first (assuming string timestamp or you can refine this later)
        setOrders(data);
      } catch (e) {
        console.error("Failed to load orders: ", e);
      }
      setLoading(false);
    }
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "orders", orderId), { status: newStatus });
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus as any } : o));
    } catch (e) {
      alert("Error updating order status");
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Pending": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "Shipped": return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "Delivered": return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Cancelled": return "bg-red-100 text-red-800 hover:bg-red-100";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground mt-2">Manage customer purchases and fulfillments.</p>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Update Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center">Loading orders...</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center">No orders found.</td></tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-xs">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{order.userName}</div>
                    <div className="text-gray-500 text-xs">{order.userEmail}</div>
                  </td>
                  <td className="px-6 py-4 font-semibold">₹{order.totalAmount}</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <select 
                      className="border text-sm rounded-md px-2 py-1"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id!, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
