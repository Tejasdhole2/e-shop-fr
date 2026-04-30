import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    address: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const { name, email, password, mobile, address } = form;

    // validation
    if (!name || !email || !password || !mobile || !address) {
      alert("Please fill all fields");
      return;
    }

    if (mobile.length !== 10) {
      alert("Enter valid mobile number");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Registered Successfully");
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("❌ Server error");
    }

    setLoading(false);
  };

  return (
    <div className="container auth">
      <h2>📝 Register</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />

      <input name="mobile" placeholder="Mobile Number" onChange={handleChange} />

      <textarea
        name="address"
        placeholder="Address"
        onChange={handleChange}
      />

      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>

      <p onClick={() => navigate("/login")} className="link">
        Already have an account? Login
      </p>
    </div>
  );
}