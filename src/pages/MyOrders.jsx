import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import CartSidebar from "../components/CartSidebar";
import { useAuth } from "../context/AuthContext";

const MyOrders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/orders/my-orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to load orders");
          return;
        }

        setOrders(data);
      } catch (error) {
        setError("Something went wrong");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    } else {
      setError("Please login first");
      setLoading(false);
    }
  }, [token]);

  const filteredOrders = useMemo(() => {
    if (statusFilter === "All") return orders;
    return orders.filter((order) => order.status === statusFilter);
  }, [orders, statusFilter]);

  return (
    <div>
      <Navbar />
      <h1>My Orders</h1>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All">All Orders</option>
        <option value="Pending">Pending</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && filteredOrders.length === 0 && (
        <p>No orders found</p>
      )}

      {!loading &&
        !error &&
        filteredOrders.map((order) => (
          <div key={order._id} className="border p-4 my-3 rounded">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total:</strong> ₹{order.totalAmount}</p>
            <p><strong>Payment:</strong> {order.paymentMethod}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        ))}
    </div>
  );
};

export default MyOrders;