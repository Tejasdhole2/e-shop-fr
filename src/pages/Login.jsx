// pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // ✅ validation
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.token) {
        // ✅ store data
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user._id);
        localStorage.setItem("userName", data.user.name);

        alert("✅ Login Success");
        navigate("/profile");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.log(err);
      alert("❌ Server error. Is backend running?");
    }

    setLoading(false);
  };

  return (
    <div className="container auth">
      <h2>🔐 Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <p>
        Don’t have an account?{" "}
        <span
          className="link"
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </p>
    </div>
  );
}