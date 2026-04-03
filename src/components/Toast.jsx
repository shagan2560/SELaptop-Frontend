import React from "react";
import { useCart } from "../context/CartContext";

const Toast = () => {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed top-24 right-6 z-[100] bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl font-medium">
      {toast}
    </div>
  );
};

export default Toast;