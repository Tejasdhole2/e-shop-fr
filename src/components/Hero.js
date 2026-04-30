// components/Hero.js
import React from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/hero.png";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      {/* LEFT */}
      <div className="hero-left">
        <span className="badge">🔥 New Arrival</span>

        <h1>NVIDIA RTX 5090 Founders Edition</h1>

        <p className="hero-desc">
          Experience next-gen performance with AI-powered graphics,
          ultra-fast rendering, and unmatched gaming power.
        </p>

        <div className="hero-buttons">
          <button
            className="btn primary"
            onClick={() => navigate("/")}
          >
            Shop Now
          </button>

          <button
            className="btn secondary"
            onClick={() => navigate("/profile")}
          >
            View Profile
          </button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="hero-right">
        <img src={heroImg} alt="RTX 5090" />
      </div>
    </section>
  );
}