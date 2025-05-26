
//src/App.jsx

import React from "react";
import AppRoutes from "./routes";
import Navbar from "./components/Navbar";  
import "./index.css";


export default function App() {
  return (
    <div
      className="min-h-screen pb-[81px] bg-[#1B1E25] mx-auto"
      style={{ maxWidth: "375px" }}
    >
      <AppRoutes />
      <Navbar />
    </div>
  );
}
