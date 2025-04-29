import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import "./index.css";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";


const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
} else {
  console.error("Root element not found");
}
