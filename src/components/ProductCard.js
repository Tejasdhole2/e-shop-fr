import React, { useState } from "react";

export default function ProductCard({ product, addToCart }) {
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first");
      window.location.href = "/login";
      return;
    }

    setLoading(true);

    await addToCart(product);

    setLoading(false);
    alert("✅ Added to cart");
  };

  return (
    <div className="card">
      {/* IMAGE */}
      <div className="image-box">
        <img
          src={
            product.image
              ? `http://localhost:5000/uploads/${product.image}`
              : "https://via.placeholder.com/150"
          }
          alt={product.name}
        />
      </div>

      {/* INFO */}
      <h3>{product.name}</h3>
      <p>{product.desc}</p>

      {/* ⭐ Rating */}
      <div className="rating">⭐⭐⭐⭐☆</div>

      {/* FOOTER */}
      <div className="card-footer">
        <span className="price">₹{product.price}</span>

        <button
          className="add-btn"
          onClick={handleAdd}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>
    </div>
  );
}