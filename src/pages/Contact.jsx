import React from "react";
import Navbar from "../components/Navbar";
import CartSidebar from "../components/CartSidebar";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CartSidebar />

      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="text-center mb-12">
          <p className="text-blue-600 font-medium">Contact Us</p>
          <h1 className="text-4xl font-bold text-gray-900">We’d Love to Hear From You</h1>
          <p className="text-gray-600 mt-3">
            Have questions about products, delivery, or support?
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Message</h2>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
              />
              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
              />
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold">
                Send Message
              </button>
            </form>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-4 text-gray-300">
              <p>Email: support@laptopstore.com</p>
              <p>Phone: +91 98765 43210</p>
              <p>Address: India</p>
              <p>Working Hours: Monday - Saturday, 9 AM - 7 PM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;