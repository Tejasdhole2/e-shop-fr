// components/Footer.js
import React from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/hero.png";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      {/* LEFT */}
      <div className="footer-left">
        <img src={heroImg} alt="Logo" />
        <p>E-Shop - Premium Hardware Store</p>
        <p className="copyright">
          © {new Date().getFullYear()} QuantumShop
        </p>
      </div>

      {/* LINKS */}
      <div className="footer-links">
        <p onClick={() => navigate("/")}>Home</p>
        <p onClick={() => navigate("/")}>Products</p>
        <p onClick={() => navigate("/profile")}>Profile</p>
        <p onClick={() => navigate("/login")}>Login</p>
      </div>

      {/* SOCIAL */}
      <div className="footer-social">
        <p>Follow Us</p>
        <div className="icons">
          <span>🌐</span>
          <span>🐦</span>
          <span>📸</span>
          <span>💼</span>
        </div>
      </div>
    </footer>
  );
}