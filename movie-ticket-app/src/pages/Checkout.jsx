import React from "react";

const Checkout = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button className="text-white text-2xl mr-2">&larr;</button>
        <h1 className="text-xl font-semibold">Checkout</h1>
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-base font-semibold">Payment Method</h2>
          <button className="text-gray-400 text-xs">Change</button>
        </div>

        {/* Card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-2xl p-4 shadow-md text-white">
          <div className="flex items-center mb-4">
            <div className="w-4 h-4 bg-red-600 rounded-sm mr-1" />
            <div className="w-4 h-4 bg-yellow-400 rounded-sm" />
            <span className="ml-auto text-xs">Balance</span>
          </div>
          <div className="text-xl font-bold">$120,580.00</div>
          <div className="mt-4 text-xs">Card Holder</div>
          <div className="font-semibold text-sm">Miles Morales</div>
          <div className="mt-2 text-sm">**** **** **** 51446</div>
        </div>
      </div>

      {/* Payment Details */}
      <div>
        <h2 className="text-base font-semibold mb-4">Payment Details</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-xs mb-1">Your Email</label>
            <input
              type="email"
              defaultValue="Milesmorales@gmail.com"
              className="w-full bg-gray-800 rounded-lg px-4 py-2 text-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Cardholder Name</label>
            <input
              type="text"
              defaultValue="Miles Morales"
              className="w-full bg-gray-800 rounded-lg px-4 py-2 text-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Card Number</label>
            <input
              type="text"
              defaultValue="**** **** **** 51446"
              className="w-full bg-gray-800 rounded-lg px-4 py-2 text-sm focus:outline-none"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-xs mb-1">Date</label>
              <input
                type="text"
                defaultValue="02 Nov 2021"
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-sm focus:outline-none"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-xs mb-1">CVV</label>
              <input
                type="text"
                defaultValue="123"
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-sm focus:outline-none"
              />
            </div>
          </div>
        </form>
      </div>

      {/* Pay Now Button */}
      <div className="mt-8">
        <button className="w-full flex items-center justify-between bg-blue-500 hover:bg-blue-600 transition text-white font-semibold text-base py-4 rounded-xl px-6">
          <span>Pay Now</span>
          <span className="border-l border-white pl-6">$99.8</span>
        </button>
      </div>
    </div>
  );
};

export default Checkout;
