import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Home from "./pages/Home";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";

import API from "./services/api";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  // ✅ Fetch products from backend
  useEffect(() => {
    fetch(`${API}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log("Product fetch error:", err));
  }, []);

  // 🔍 Search filter
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Backend cart add
  const addToCart = async (product) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first");
      return;
    }

    try {
      await fetch(`${API}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId,
          product: {
            name: product.name,
            price: product.price,
            qty: 1
          }
        })
      });

      alert("✅ Added to cart");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BrowserRouter>
      <Navbar setCartOpen={setCartOpen} setSearch={setSearch} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Home
                products={filteredProducts}
                addToCart={addToCart}
              />
            </>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        {/* ✅ ADMIN PAGE */}
        <Route path="/admin" element={<Admin />} />
      </Routes>

      <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />

      <Footer />
    </BrowserRouter>
  );
}