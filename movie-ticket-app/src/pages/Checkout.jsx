// src/pages/Checkout.jsx

import React from "react";

export default function Checkout() {
  return (
    <div
      className="bg-[#1B1E25] min-h-screen text-white p-4 space-y-6 mx-auto"
      style={{ maxWidth: "420px" }}
    >
      <h2 className="text-xl font-bold text-white mb-4">Checkout</h2>

      {/* Payment Method Card */}
      <div className="bg-gradient-to-br from-[#007CD7] to-[#54A8E5] rounded-2xl text-white p-5 relative">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold">Payment Method</span>
          <button className="text-sm underline opacity-70">Change</button>
        </div>
        <div className="h-[140px] flex flex-col justify-between">
          <div className="text-right text-lg font-semibold">Balance</div>
          <div className="text-right text-2xl font-bold">$120,580.00</div>
          <div className="flex justify-between text-sm mt-4">
            <span className="opacity-90">Card Holder</span>
            <span className="opacity-90">**** **** 51446</span>
          </div>
          <div className="flex justify-between text-sm font-semibold">
            <span>Miles Morales</span>
            <span>51446</span>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Payment Details</h3>

        <div className="space-y-2">
          <label className="text-sm text-gray-400 block">Your Email</label>
          <input
            type="email"
            defaultValue="milesmorales@gmail.com"
            className="w-full bg-[#2C2F36] p-3 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400 block">Cardholder Name</label>
          <input
            type="text"
            defaultValue="Miles Morales"
            className="w-full bg-[#2C2F36] p-3 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400 block">Card Number</label>
          <input
            type="text"
            defaultValue="**** **** **** 51446"
            className="w-full bg-[#2C2F36] p-3 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none"
          />
        </div>

        <div className="flex gap-4">
          <div className="w-1/2 space-y-2">
            <label className="text-sm text-gray-400 block">Date</label>
            <input
              type="text"
              defaultValue="02 Nov 2021"
              className="w-full bg-[#2C2F36] p-3 rounded-xl text-sm text-white focus:outline-none"
            />
          </div>
          <div className="w-1/2 space-y-2">
            <label className="text-sm text-gray-400 block">CVV</label>
            <input
              type="text"
              defaultValue="123"
              className="w-full bg-[#2C2F36] p-3 rounded-xl text-sm text-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Pay Now Button */}
      <button className="w-full bg-[#54A8E5] text-white font-bold py-3 rounded-xl mt-4">
        Pay Now &nbsp; <span className="text-base font-semibold">$99.8</span>
      </button>
    </div>
  );
}
