import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import CartSidebar from "../components/CartSidebar";
import Toast from "../components/Toast";
import laptops from "../data/laptops";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const LaptopDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const laptop = laptops.find((item) => item.id === Number(id));

  if (!laptop) {
    return <div className="p-10">Laptop not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CartSidebar />
      <Toast />

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid lg:grid-cols-2 gap-10 bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
          <div>
            <img
              src={laptop.image}
              alt={laptop.name}
              className="w-full h-[420px] object-cover rounded-3xl"
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="w-fit bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              {laptop.category}
            </span>

            <h1 className="text-4xl font-bold text-gray-900 mb-3">{laptop.name}</h1>
            <p className="text-gray-500 mb-2">Brand: {laptop.brand}</p>
            <p className="text-yellow-600 font-medium mb-3">⭐ {laptop.rating}</p>
            <p className="text-3xl font-bold text-emerald-600 mb-6">
              ₹{laptop.price.toLocaleString()}
            </p>

            <p className="text-gray-700 leading-7 mb-8">{laptop.description}</p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => addToCart(laptop)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
              >
                Add to Cart
              </button>

              <button
                onClick={() => toggleWishlist(laptop)}
                className={`px-6 py-3 rounded-xl font-semibold ${
                  isInWishlist(laptop.id)
                    ? "bg-pink-600 text-white"
                    : "border border-gray-300 text-gray-700"
                }`}
              >
                {isInWishlist(laptop.id) ? "Wishlisted" : "Add to Wishlist"}
              </button>

              <Link
                to="/product"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaptopDetails;