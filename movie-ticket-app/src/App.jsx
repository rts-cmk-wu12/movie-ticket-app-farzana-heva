// src/App.jsx

import AppRoutes from "./routes";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom"; // ✅ NEW
import "./index.css";

export default function App() {
  const location = useLocation();
  const showNavbar = ["/", "/explore"].includes(location.pathname); 
  return (
    <div
      className="min-h-screen pb-[81px] bg-[#1B1E25] p-[16px]"
      style={{ width: "100%" }}
    >
      <AppRoutes />
      {showNavbar && <Navbar />} 
    </div>
  );
}
