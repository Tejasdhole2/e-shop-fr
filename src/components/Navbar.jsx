// components/Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ setCartOpen, setSearch, cartItems = [] }) {
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  const handleProfileClick = () => {
    if (!userId) {
      navigate("/login");
    } else {
      navigate("/profile");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="logo" onClick={() => navigate("/")}>
        E-<span>SHOP</span>
      </div>

      {/* SEARCH */}
      <input
        className="search"
        placeholder="Search components..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ACTIONS */}
      <div className="nav-actions">
        {/* USER */}
        {userId ? (
          <>
            <span className="username">Hi, {userName || "User"}</span>
            <button onClick={handleProfileClick}>👤</button>
            <button onClick={handleLogout}>🚪</button>
          </>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}

        {/* CART */}
        <div className="cart-icon" onClick={() => setCartOpen(true)}>
          🛒
          {cartItems.length > 0 && (
            <span className="cart-badge">{cartItems.length}</span>
          )}
        </div>
      </div>
    </nav>
  );
}