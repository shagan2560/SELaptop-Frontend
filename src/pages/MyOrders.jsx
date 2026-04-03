import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
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
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        
        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          My Orders
        </h1>

        {/* Filter */}
        <div className="mb-8">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="All">All Orders</option>
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-gray-600 text-lg">Loading...</p>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-500 text-lg">{error}</p>
        )}

        {/* Empty */}
        {!loading && !error && filteredOrders.length === 0 && (
          <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
            No orders found
          </div>
        )}

        {/* Orders List */}
        <div className="grid gap-6">
          {!loading &&
            !error &&
            filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
              >
                {/* Top Row */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-semibold text-gray-800 break-all">
                      {order._id}
                    </p>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="text-gray-700">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-xl font-bold text-blue-600">
                      ₹{order.totalAmount}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Payment</p>
                    <p className="font-semibold text-gray-700">
                      {order.paymentMethod}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-semibold text-green-600">
                      {order.status || "Placed"}
                    </p>
                  </div>

                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;