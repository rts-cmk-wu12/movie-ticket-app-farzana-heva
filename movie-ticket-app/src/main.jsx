// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom"; // ✅ أضيفي هذا
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ لفي كل التطبيق فيه */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
