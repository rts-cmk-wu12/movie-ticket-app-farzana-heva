// src/routes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // ✅ بدون BrowserRouter

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import MovieDetails from "./pages/MovieDetails";

import SelectSeats from "./pages/SelectSeats";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import ETicket from "./pages/ETicket";
import DownloadTicket from "./pages/DownloadTicket";
import SavedPlans from "./pages/SavedPlans";
import Settings from "./pages/Settings";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
     <Route path="/select-seats/:id" element={<SelectSeats />} />

      <Route path="/checkout" element={<Checkout />} />
      <Route path="/success" element={<PaymentSuccess />} />
      <Route path="/e-ticket" element={<ETicket />} />
      <Route path="/download" element={<DownloadTicket />} />
      <Route path="/plans" element={<SavedPlans />} />
      <Route path="/settings" element={<Settings />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
