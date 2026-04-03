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
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

    fetchOrders();
  }, [token]);

  const filteredOrders = useMemo(() => {
    if (statusFilter === "All") return orders;
    return orders.filter((order) => order.orderStatus === statusFilter);
  }, [orders, statusFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CartSidebar />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-blue-600 font-medium">My Orders</p>
            <h1 className="text-4xl font-bold text-gray-900">Order Status</h1>
          </div>

          <div className="w-full md:w-64">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 bg-white"
            >
              <option value="All">All Orders</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {loading && <p className="text-gray-500">Loading orders...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && filteredOrders.length === 0 && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 text-gray-500">
            No orders found for this status.
          </div>
        )}

        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8"
            >
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-semibold text-gray-800 break-all">
                    {order._id}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Delivery Status</p>
                  <p className="font-semibold text-blue-600">
                    {order.orderStatus}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-semibold text-purple-600">
                    {order.paymentMethod}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-semibold text-emerald-600">
                    ₹{order.totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mb-5 bg-gray-50 rounded-2xl p-4">
                <p className="font-semibold text-gray-800 mb-2">
                  Payment Description
                </p>
                <p className="text-sm text-gray-600">
                  {order.paymentDescription || "No payment description available"}
                </p>
              </div>

              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border-b pb-4 last:border-b-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.brand}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.qty} × ₹{item.price.toLocaleString()}
                      </p>
                    </div>
                    <p className="font-semibold text-emerald-600">
                      ₹{(item.qty * item.price).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-gray-50 rounded-2xl p-4">
                <p className="font-semibold text-gray-800 mb-2">Shipping Info</p>
                <p className="text-sm text-gray-600">
                  {order.shippingInfo.fullName}, {order.shippingInfo.address},{" "}
                  {order.shippingInfo.city}, {order.shippingInfo.postalCode},{" "}
                  {order.shippingInfo.country}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {order.shippingInfo.email} | {order.shippingInfo.phone}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MyOrders;