// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import ETicket from "./pages/ETicket"; // ✅ Import E-Ticket page

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/e-ticket" element={<ETicket />} />{" "}
        {/* ✅ E-Ticket route */}
        {/* لاحقاً: باقي الصفحات */}
      </Routes>
    </Router>
  );
}
