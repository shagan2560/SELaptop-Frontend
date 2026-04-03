import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import CartSidebar from "../components/CartSidebar";
import Toast from "../components/Toast";
import ProductCard from "../components/ProductCard";
import laptops from "../data/laptops";

const Product = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState("default");

  const filteredProducts = useMemo(() => {
    let data = [...laptops];

    if (search) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      data = data.filter((item) => item.category === category);
    }

    if (price === "under50000") {
      data = data.filter((item) => item.price <= 50000);
    } else if (price === "50000to70000") {
      data = data.filter((item) => item.price > 50000 && item.price <= 70000);
    } else if (price === "above70000") {
      data = data.filter((item) => item.price > 70000);
    }

    if (sort === "lowToHigh") {
      data.sort((a, b) => a.price - b.price);
    } else if (sort === "highToLow") {
      data.sort((a, b) => b.price - a.price);
    }

    return data;
  }, [search, category, price, sort]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CartSidebar />
      <Toast />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10">
          <p className="text-blue-600 font-medium">Our Collection</p>
          <h1 className="text-4xl font-bold text-gray-900">Browse Laptops</h1>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm grid md:grid-cols-4 gap-4 mb-10">
          <input
            type="text"
            placeholder="Search laptop..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="all">All Categories</option>
            <option value="Student">Student</option>
            <option value="Office">Office</option>
            <option value="Professional">Professional</option>
            <option value="Gaming">Gaming</option>
            <option value="Premium">Premium</option>
          </select>

          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="all">All Prices</option>
            <option value="under50000">Under ₹50,000</option>
            <option value="50000to70000">₹50,000 - ₹70,000</option>
            <option value="above70000">Above ₹70,000</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="default">Sort By</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 text-gray-500">No laptops found.</div>
        )}
      </section>
    </div>
  );
};

export default Product;