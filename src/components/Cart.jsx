// components/Cart.js
import React, { useEffect, useState } from "react";

export default function Cart({ cartOpen, setCartOpen }) {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem("userId");

  // 📥 Fetch cart safely
  const fetchCart = async () => {
    if (!userId) return;

    try {
      const res = await fetch(`http://localhost:5000/cart/${userId}`);
      const data = await res.json();
      setCartItems(data || []);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    if (cartOpen) fetchCart();
  }, [cartOpen, fetchCart]);

  // ➕ Increase quantity (frontend + backend)
  const increaseQty = async (index) => {
    const updated = [...cartItems];
    updated[index].qty += 1;
    setCartItems(updated);

    await fetch("http://localhost:5000/cart/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        index,
        qty: updated[index].qty,
      }),
    });
  };

  // ➖ Decrease quantity
  const decreaseQty = async (index) => {
    const updated = [...cartItems];

    if (updated[index].qty > 1) {
      updated[index].qty -= 1;
      setCartItems(updated);

      await fetch("http://localhost:5000/cart/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          index,
          qty: updated[index].qty,
        }),
      });
    }
  };

  // ❌ Remove item
  const removeItem = async (index) => {
    try {
      const updated = cartItems.filter((_, i) => i !== index);
      setCartItems(updated);

      await fetch("http://localhost:5000/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, index }),
      });
    } catch (err) {
      console.log("Remove error:", err);
    }
  };

  // 💰 Total
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.qty,
    0
  );

  // 🚫 Not logged in
  if (!userId && cartOpen) {
    return (
      <div className="cart-overlay" onClick={() => setCartOpen(false)}>
        <div className="cart">
          <h2>Please Login</h2>
          <button onClick={() => (window.location.href = "/login")}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!cartOpen) return null;

  return (
    <div className="cart-overlay" onClick={() => setCartOpen(false)}>
      <div className="cart" onClick={(e) => e.stopPropagation()}>
        <h2>🛒 Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cartItems.map((item, i) => (
              <div key={i} className="cart-item">
                <div>
                  <p><b>{item.name}</b></p>
                  <p>₹{item.price}</p>
                </div>

                <div className="cart-controls">
                  <button onClick={() => decreaseQty(i)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increaseQty(i)}>+</button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(i)}
                >
                  ❌
                </button>
              </div>
            ))}

            <hr />
            <h3>Total: ₹{total}</h3>

            <button
              className="checkout-btn"
              onClick={async () => {
                try {
                  await fetch("http://localhost:5000/order", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userId }),
                  });

                  alert("✅ Order Placed!");
                  setCartItems([]);
                } catch (err) {
                  console.log("Order error:", err);
                }
              }}
            >
              Checkout
            </button>
          </>
        )}

        <button onClick={() => setCartOpen(false)}>Close</button>
      </div>
    </div>
  );
}