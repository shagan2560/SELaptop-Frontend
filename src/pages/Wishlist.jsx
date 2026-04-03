import React from "react";
import Navbar from "../components/Navbar";
import CartSidebar from "../components/CartSidebar";
import ProductCard from "../components/ProductCard";
import { useWishlist } from "../context/WishlistContext";

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CartSidebar />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10">
          <p className="text-pink-600 font-medium">Saved Products</p>
          <h1 className="text-4xl font-bold text-gray-900">My Wishlist</h1>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-10 text-center text-gray-500">
            Your wishlist is empty.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Wishlist;