import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const ProductCard = ({ item }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition">
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-60 object-cover"
        />

        <button
          onClick={() => toggleWishlist(item)}
          className={`absolute top-4 right-4 px-3 py-2 rounded-xl text-sm font-medium ${
            isInWishlist(item.id)
              ? "bg-pink-600 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          ♥
        </button>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
            {item.category}
          </span>
          <span className="text-sm text-gray-500">{item.brand}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>

        <p className="text-sm text-gray-600 mb-3">{item.description}</p>

        <div className="flex items-center justify-between mb-4">
          <p className="text-2xl font-bold text-emerald-600">
            ₹{item.price.toLocaleString()}
          </p>
          <p className="text-sm text-yellow-600 font-medium">⭐ {item.rating}</p>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/product/${item.id}`}
            className="flex-1 text-center px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100"
          >
            Details
          </Link>

          <button
            onClick={() => addToCart(item)}
            className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;