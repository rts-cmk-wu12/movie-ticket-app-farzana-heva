import React, { useState } from "react";
import CardImage1 from "../assets/Card-Payment-1.png";
import MasterCardLogo from "../assets/mastercard.png";
import PaymentSuccessModal from "../components/PaymentSuccessModal";
import BackArrow from "../icons/BackArrow";
import { Link } from "react-router-dom";
 
export default function Checkout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    email: "",
    name: "",
    cardNumber: "",
    date: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
 
  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email";
    if (!form.name) newErrors.name = "Cardholder name is required";
    if (!form.cardNumber) newErrors.cardNumber = "Card number is required";
    if (!form.date) newErrors.date = "Date is required";
    if (!form.cvv) {
      newErrors.cvv = "CVV is required";
    } else if (!/^\d{3,4}$/.test(form.cvv)) {
      newErrors.cvv = "Invalid CVV";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsModalOpen(true);
      setForm({
        email: "",
        name: "",
        cardNumber: "",
        date: "",
        cvv: "",
      });
    }
  };
 
  return (
    <div className="relative min-h-screen">
      {/* Background overlay when modal is open */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity" />
      )}
 
      {/* Main Content */}
      <div
        className={`bg-[#1B1E25] min-h-screen text-white p-4 space-y-6 mx-auto relative z-10 transition-all ${
          isModalOpen ? "opacity-40" : "opacity-100"
        }`}
        style={{ maxWidth: "420px" }}
      >
        <div className="flex items-center justify-between px-4 pt-10 mb-6">
          <Link to="/explore" className="text-gray-400 text-lg">
            <BackArrow />
          </Link>
          <h1 className="text-xl font-bold">Checkout</h1>
          <div className="w-5" />
        </div>
 
        <h2 className="text-xl font-bold text-white mb-4">Payment Method</h2>
 
        {/* Payment Method Card */}
        <div className="text-white p-5 relative">
          <img
            className="h-[34px] w-[34px] absolute top-[20px] left-[20px] z-10"
            src={MasterCardLogo}
            alt="Card Logo"
          />
          <img className="h-[170px] w-full" src={CardImage1} alt="Card Image" />
        </div>
 
        {/* Payment Details */}
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <h3 className="text-lg font-semibold">Payment Details</h3>
 
          <div className="space-y-2">
            <label className="text-sm text-gray-400 block">Your Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full bg-[#2C2F36] p-3 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none my-[10px] ${
                errors.email ? "border border-red-500" : ""
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="text-xs text-red-400">{errors.email}</span>
            )}
          </div>
 
          <div className="space-y-2">
            <label className="text-sm text-gray-400 block">
              Cardholder Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`w-full bg-[#2C2F36] p-3 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none my-[10px] ${
                errors.name ? "border border-red-500" : ""
              }`}
              placeholder="Enter cardholder name"
            />
            {errors.name && (
              <span className="text-xs text-red-400">{errors.name}</span>
            )}
          </div>
 
          <div className="space-y-2">
            <label className="text-sm text-gray-400 block">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={form.cardNumber}
              onChange={handleChange}
              className={`w-full bg-[#2C2F36] p-3 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none my-[10px] ${
                errors.cardNumber ? "border border-red-500" : ""
              }`}
              placeholder="Enter card number"
              maxLength={19}
            />
            {errors.cardNumber && (
              <span className="text-xs text-red-400">{errors.cardNumber}</span>
            )}
          </div>
 
          <div className="flex gap-4">
            <div className="w-1/2 space-y-2">
              <label className="text-sm text-gray-400 block">Date</label>
              <input
                type="text"
                name="date"
                value={form.date}
                onChange={handleChange}
                className={`w-full bg-[#2C2F36] p-3 rounded-xl text-sm text-white focus:outline-none my-[10px] ${
                  errors.date ? "border border-red-500" : ""
                }`}
                placeholder="MM/YY"
                maxLength={5}
              />
              {errors.date && (
                <span className="text-xs text-red-400">{errors.date}</span>
              )}
            </div>
            <div className="w-1/2 space-y-2">
              <label className="text-sm text-gray-400 block">CVV</label>
              <input
                type="text"
                name="cvv"
                value={form.cvv}
                onChange={handleChange}
                className={`w-full bg-[#2C2F36] p-3 rounded-xl text-sm text-white focus:outline-none my-[10px] ${
                  errors.cvv ? "border border-red-500" : ""
                }`}
                placeholder="CVV"
                maxLength={4}
              />
              {errors.cvv && (
                <span className="text-xs text-red-400">{errors.cvv}</span>
              )}
            </div>
          </div>
 
          {/* Pay Now Button */}
          <button
            type="submit"
            className="w-full bg-[#54A8E5] text-white font-bold py-3 rounded-xl mt-4 mt-[1rem]"
          >
            Pay Now &nbsp;
            <span className="text-base font-semibold">$99.8</span>
          </button>
        </form>
      </div>
 
      {/* Modal */}
      <PaymentSuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
 
 