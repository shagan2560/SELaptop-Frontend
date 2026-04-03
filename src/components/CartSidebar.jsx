import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartSidebar = () => {
    const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  return (
    <>
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-50 transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-xl text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-4 h-[calc(100%-170px)] overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="border rounded-2xl p-4 flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.brand}</p>
                  <p className="text-emerald-600 font-semibold mt-1">
                    ₹{item.price.toLocaleString()}
                  </p>

                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-3 py-1 bg-gray-200 rounded-lg"
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-3 py-1 bg-gray-200 rounded-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 font-medium"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <div className="border-t p-5 bg-white">
  <div className="flex justify-between items-center mb-4">
    <span className="text-lg font-semibold text-gray-700">Total</span>
    <span className="text-2xl font-bold text-blue-600">
      ₹{totalPrice.toLocaleString()}
    </span>
  </div>

  <button
    onClick={() => {
      setIsCartOpen(false);
      navigate("/checkout");
    }}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
  >
    Proceed to Checkout
  </button>
</div>
      </div>
    </>
  );
};

export default CartSidebar;