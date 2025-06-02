
// src/components/ETicketMini.jsx


import React, { useEffect, useState } from "react";
import Barcode from "../assets/Barcode.svg"; // Make sure this path is correct
 
const ETicketMini = () => {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState("");
 
  useEffect(() => {
    setDate(localStorage.getItem("eticket_date") || "N/A");
    setLocation(localStorage.getItem("eticket_location") || "N/A");
    setTime(localStorage.getItem("eticket_time") || "N/A");
    setSeats(localStorage.getItem("eticket_seats") || "N/A");
  }, []);
 
  return (
    <div
      style={{
        background: "white",
        color: "black",
        height: "444px",
        padding: "20px",
      }}
      className="relative !bg-white !text-black rounded-xl py-4 w-[280px] shadow-lg overflow-hidden"
    >
      {/* Punches */}
      <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#121418] rounded-full z-10" />
      <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#121418] rounded-full z-10" />
 
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-bold">Film: Shang-Chi</h3>
        <span className="text-red-500 text-sm font-semibold">e-ticket</span>
      </div>
 
      {/* Ticket Details */}
      <div className="grid grid-cols-2 gap-y-4 gap-x-3 text-xs mb-4 py-[2em] ">
        <div className="py-[1em]">
          <p className="text-gray-500">Date</p>
          <p className="font-bold">{date}</p>
        </div>
        <div className="py-[1em]">
          <p className="text-gray-500">Seats</p>
          <p className="font-bold">{seats}</p>
        </div>
        <div className="py-[1em]">
          <p className="text-gray-500">Location</p>
          <p className="font-bold">{location}</p>
        </div>
        <div className="py-[1em]">
          <p className="text-gray-500">Time</p>
          <p className="font-bold">{time}</p>
        </div>
        <div className="py-[1em]">
          <p className="text-gray-500">Payment</p>
          <p className="font-bold">Successful</p>
        </div>
        <div className="py-[1em]">
          <p className="text-gray-500">Order</p>
          <p className="font-bold">1904566</p>
        </div>
      </div>
 
      {/* Divider + Barcode */}
      <div className="mt-[1em] border-t border-dashed border-gray-300 pt-3">
        <img src={Barcode} alt="Barcode" />
      </div>
    </div>
  );
};
 
export default ETicketMini;
 
 