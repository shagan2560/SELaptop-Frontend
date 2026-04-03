import React, { useState } from "react";
import Navbar from "../components/Navbar";
import CartSidebar from "../components/CartSidebar";
import Toast from "../components/Toast";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "Cash on Delivery",
    upiId: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessPrompt, setShowSuccessPrompt] = useState(false);

  const shippingCharge = totalPrice > 0 ? 500 : 0;
  const finalTotal = totalPrice + shippingCharge;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return "Full name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!formData.phone.trim()) return "Phone is required";
    if (!formData.address.trim()) return "Address is required";
    if (!formData.city.trim()) return "City is required";
    if (!formData.postalCode.trim()) return "Postal code is required";
    if (!formData.country.trim()) return "Country is required";
    if (!formData.paymentMethod.trim()) return "Payment method is required";

    if (formData.paymentMethod === "UPI" && !formData.upiId.trim()) {
      return "UPI ID is required";
    }

    if (cart.length === 0) return "Your cart is empty";

    return "";
  };

  const getPaymentDescription = () => {
    if (formData.paymentMethod === "UPI") {
      return `Payment will be done via UPI ID: ${formData.upiId}`;
    }

    if (formData.paymentMethod === "Card") {
      return "Payment will be completed through card gateway";
    }

    return "Cash on Delivery selected";
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const orderItems = cart.map((item) => ({
        productId: item.id,
        name: item.name,
        brand: item.brand,
        price: item.price,
        qty: item.qty,
        image: item.image,
      }));

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: orderItems,
          shippingInfo: {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
            country: formData.country,
          },
          paymentMethod: formData.paymentMethod,
          paymentDescription: getPaymentDescription(),
          upiId: formData.upiId,
          totalAmount: finalTotal,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to place order");
        return;
      }

      clearCart();
      setShowSuccessPrompt(true);
    } catch (error) {
      setError("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const closePrompt = () => {
    setShowSuccessPrompt(false);
    navigate("/my-orders");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CartSidebar />
      <Toast />

      {showSuccessPrompt && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] px-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-3xl">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Order Placed
            </h2>
            <p className="text-gray-600 mb-6">
              Check your email for payment gateway.
            </p>
            <button
              onClick={closePrompt}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
            >
              View Order Status
            </button>
          </div>
        </div>
      )}

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10">
          <p className="text-blue-600 font-medium">Checkout</p>
          <h1 className="text-4xl font-bold text-gray-900">
            Complete Your Order
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <form
            onSubmit={handlePlaceOrder}
            className="lg:col-span-2 bg-white rounded-3xl border border-gray-200 shadow-sm p-8 space-y-5"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Shipping Information
            </h2>

            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
            />

            <div className="grid md:grid-cols-3 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
              />

              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
              />

              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Payment Method
              </label>

              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
              </select>
            </div>

            {formData.paymentMethod === "UPI" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Enter UPI ID
                </label>
                <input
                  type="text"
                  name="upiId"
                  placeholder="example@upi"
                  value={formData.upiId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-70"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </form>

          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 h-fit">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">
              {cart.length === 0 ? (
                <p className="text-gray-500">No items in cart.</p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b pb-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.qty} × ₹{item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>₹{shippingCharge.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Payment Method</span>
                <span>{formData.paymentMethod}</span>
              </div>

              {formData.paymentMethod === "UPI" && formData.upiId && (
                <div className="flex justify-between text-gray-600">
                  <span>UPI ID</span>
                  <span>{formData.upiId}</span>
                </div>
              )}

              <div className="rounded-2xl bg-gray-50 px-4 py-3 text-gray-600">
                <span className="font-semibold text-gray-800 block mb-1">
                  Payment Description
                </span>
                <span>{getPaymentDescription()}</span>
              </div>

              <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-3">
                <span>Total</span>
                <span>₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;