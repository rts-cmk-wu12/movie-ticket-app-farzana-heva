// src/pages/ETicket.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ETicket = () => {
  const [downloaded, setDownloaded] = useState(false);
  const navigate = useNavigate();

  const handleDownload = () => {
    setDownloaded(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-6 max-w-md mx-auto font-sans">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          className="text-white text-2xl mr-2"
          onClick={() => navigate(-1)}
        >
          &larr;
        </button>
        <h1 className="text-xl font-semibold">E-Ticket</h1>
      </div>

      {/* Instruction */}
      <div className="mb-6">
        <h2 className="text-base font-semibold mb-1">Instruction</h2>
        <p className="text-sm text-gray-400 leading-snug">
          Come to the cinema, show and scan the barcode to the space provided.
          Continue to comply with health protocols.
        </p>
      </div>

      {/* Ticket Card */}
      <div className="bg-white text-black rounded-2xl p-4 shadow-md mb-8">
        {/* Film Info */}
        <div className="flex justify-between items-start mb-3">
          <span className="font-semibold text-sm">Film: Shang-Chi</span>
          <span className="text-pink-600 font-bold text-sm">e-ticket</span>
        </div>

        {/* Ticket Details */}
        <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-600">
          <div>
            <p className="font-medium">Date</p>
            <p className="text-black">06/09/2021</p>
          </div>
          <div>
            <p className="font-medium">Seats</p>
            <p className="text-black">C4, C5</p>
          </div>
          <div>
            <p className="font-medium">Location</p>
            <p className="text-black">Viva Cinema</p>
          </div>
          <div>
            <p className="font-medium">Time</p>
            <p className="text-black">01.00 PM</p>
          </div>
          <div>
            <p className="font-medium">Payment</p>
            <p className="text-black">Successful</p>
          </div>
          <div>
            <p className="font-medium">Order</p>
            <p className="text-black">1904566</p>
          </div>
        </div>

        {/* Barcode */}
        <div className="mt-6 border-t border-dashed border-black pt-4 flex justify-center gap-1">
          {["w-4", "w-1", "w-3", "w-1", "w-4", "w-2", "w-1", "w-3"].map(
            (w, i) => (
              <div key={i} className={`h-16 bg-black ${w} rounded-sm`} />
            )
          )}
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="w-full bg-blue-500 hover:bg-blue-600 transition text-white font-semibold text-base py-4 rounded-xl"
      >
        Download E-Ticket
      </button>

      {/* Modal After Download */}
      {downloaded && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-end">
          <div className="bg-blue-400 w-full rounded-t-3xl px-6 py-8 text-white text-center">
            <div className="bg-white text-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-3xl">
              ⬇️
            </div>
            <h3 className="text-lg font-bold mb-2">
              Your ticket has been downloaded
            </h3>
            <p className="text-sm mb-6 leading-snug">
              Your digital ticket is ready. Show the barcode at the cinema gate.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-black text-white w-full py-3 rounded-xl font-semibold"
            >
              Back To Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ETicket;
