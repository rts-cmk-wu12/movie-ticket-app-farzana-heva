// src/pages/PaymentSuccess.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react"; // أيقونة علامة الصح

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1B1E25] flex items-center justify-center text-white px-4">
      <div className="bg-[#38BDF8] text-center rounded-t-3xl w-full max-w-sm py-10 px-6 relative">
        {/* دائرة الأيقونة */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
          <CheckCircle size={28} className="text-[#38BDF8]" />
        </div>

        <h2 className="text-lg font-semibold mt-8 mb-2">Your payment was successful</h2>
        <p className="text-sm text-white/80 mb-6">
          Adele is a Scottish heiress whose extremely wealthy family owns
          estates and grounds. When she was a teenager. Read More
        </p>

        <button
          onClick={() => navigate("/download-ticket")}
          className="bg-black text-white text-sm font-medium py-3 px-6 rounded-xl w-full hover:opacity-90"
        >
          See E-Ticket
        </button>
      </div>
    </div>
  );
}
