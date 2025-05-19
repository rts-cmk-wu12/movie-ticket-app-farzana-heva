// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
// لاحقاً: import Details, Checkout, etc

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* لاحقاً: باقي الصفحات */}
      </Routes>
    </Router>
  );
}
