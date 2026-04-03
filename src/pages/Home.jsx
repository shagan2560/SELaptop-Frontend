import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import CartSidebar from "../components/CartSidebar";
import Toast from "../components/Toast";
import ProductCard from "../components/ProductCard";
import laptops from "../data/laptops";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CartSidebar />
      <Toast />

      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-blue-300 font-medium mb-3">Modern Laptop Collection</p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5">
              Upgrade Your Work With Premium Laptops
            </h1>
            <p className="text-gray-200 text-lg mb-8 max-w-xl">
              Discover stylish, high-performance laptops for work, gaming,
              study, and professional use.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/product"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold"
              >
                Shop Now
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl border border-white/30 hover:bg-white/10 font-semibold"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur">
            <img
              src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200"
              alt="Laptop"
              className="w-full h-[360px] object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-6">
          {["Gaming", "Student", "Office", "Premium"].map((item) => (
            <div
              key={item}
              className="bg-white p-6 rounded-2xl text-center border border-gray-200 shadow-sm font-semibold text-gray-700"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-blue-600 font-medium">Featured Products</p>
            <h2 className="text-3xl font-bold text-gray-900">Best Selling Laptops</h2>
          </div>

          <Link to="/product" className="text-blue-600 font-semibold hover:underline">
            View All
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {laptops.slice(0, 6).map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;