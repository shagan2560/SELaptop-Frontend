import React, { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FaCartArrowDown } from "react-icons/fa6";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-600 transition";

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold">
            SH
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Laptop Store</h1>
            <p className="text-xs text-gray-500">Premium Ecommerce Experience</p>
          </div>
        </div>

        <nav className="flex items-center gap-6">
          <NavLink to="/home" className={navClass}>
            Home
          </NavLink>
          <NavLink to="/product" className={navClass}>
            Product
          </NavLink>
          <NavLink to="/wishlist" className={navClass}>
            Wishlist
          </NavLink>
          <NavLink to="/contact" className={navClass}>
            Contact
          </NavLink>
          {user?.isAdmin && (
            <NavLink to="/admin/orders" className={navClass}>
              Admin Orders
            </NavLink>
          )}
        </nav>

        <div className="flex flex-wrap items-center gap-3 relative">
          <button
            onClick={() => setShowAccountMenu((prev) => !prev)}
            className="px-4 py-2 bg-blue-600 rounded-xl text-sm font-medium text-white hover:bg-blue-800"
          >
            {user?.name || "My Account"}
          </button>

          {showAccountMenu && (
            <div className="absolute top-14 right-0 w-56 bg-white border border-gray-200 rounded-2xl shadow-lg p-3 z-50">
              <button
                onClick={() => {
                  setIsCartOpen(true);
                  setShowAccountMenu(false);
                }}
                className="w-full text-left px-4 py-2 rounded-xl hover:bg-gray-100 text-sm text-gray-700"
              >
                My Cart ({cartCount})
              </button>

              <Link
                to="/wishlist"
                onClick={() => setShowAccountMenu(false)}
                className="block px-4 py-2 rounded-xl hover:bg-gray-100 text-sm text-gray-700"
              >
                Wishlist ({wishlist.length})
              </Link>

              <Link
                to="/my-orders"
                onClick={() => setShowAccountMenu(false)}
                className="block px-4 py-2 rounded-xl hover:bg-gray-100 text-sm text-gray-700"
              >
                Order Status
              </Link>
            </div>
          )}

          <button
            onClick={() => setIsCartOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-xl font-medium "
          >
            My Cart ({cartCount})
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-blue-600 hover:bg-black text-white rounded-xl font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;