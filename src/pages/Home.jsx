import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import API from "../services/api";

export default function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API}/products`);
        const data = await res.json();

        setProducts(data || []);
      } catch (err) {
        console.log("Product fetch error:", err);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <main className="container">
      <h2>🔥 Products</h2>

      {/* ⏳ Loading */}
      {loading && <p>Loading products...</p>}

      {/* ❌ Empty */}
      {!loading && products.length === 0 && (
        <p>No products available</p>
      )}

      {/* ✅ Products */}
      <div className="grid">
        {products.map((p) => (
          <ProductCard
            key={p._id}
            product={p}
            addToCart={addToCart}
          />
        ))}
      </div>
    </main>
  );
}