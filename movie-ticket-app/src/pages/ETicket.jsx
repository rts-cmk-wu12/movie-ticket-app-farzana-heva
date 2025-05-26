import React from "react";
import { useNavigate } from "react-router-dom";

export default function ETicket() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#1B1E25] text-white min-h-screen p-6 space-y-6" style={{ maxWidth: "420px", margin: "auto" }}>
      <h2 className="text-center text-lg font-semibold">E-Ticket</h2>
      <p className="text-sm text-gray-400 text-center">
        Come to the cinema, show and scan the barcode to the space provided. Continue to comply with health protocols.
      </p>

      <div className="bg-white text-black rounded-xl p-4 space-y-3 shadow-md">
        <div className="flex justify-between items-center">
          <p className="font-semibold">Film: <span className="font-normal">Shang-Chi</span></p>
          <p className="text-red-500 text-sm">e-ticket</p>
        </div>

        <div className="text-sm space-y-1">
          <p><strong>Date:</strong> 06/09/2021</p>
          <p><strong>Seats:</strong> c4, c5</p>
          <p><strong>Location:</strong> Viva Cinema</p>
          <p><strong>Time:</strong> 01.00 PM</p>
          <p><strong>Payment:</strong> Successful</p>
          <p><strong>Order:</strong> 1904566</p>
        </div>

        <div className="mt-4 flex justify-center">
          <img src="/barcode.svg" alt="barcode" className="h-20" />
        </div>
      </div>

      <button
        className="bg-blue-500 text-white w-full py-3 rounded-xl font-medium"
        onClick={() => navigate("/download")}
      >
        Download E-Ticket
      </button>
    </div>
  );
}
