// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Archive from "../pages/SavedPlans";
import Settings from "../pages/Settings";
import Footer from "../components/Footer";
import "./index.css";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen pb-[81px] bg-[#1B1E25]"> {/* تحتفظ بمساحة الفوتر */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/archive" element={<Archive />} />
         <Route path="/settings" element={<Settings />} />


        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
