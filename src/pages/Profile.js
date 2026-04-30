// pages/Profile.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API}/profile/${userId}`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.log(err);
        alert("❌ Failed to load profile");
      }
      setLoading(false);
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) return <p className="center">Loading profile...</p>;

  return (
    <div className="container profile">
      <h2>👤 My Profile</h2>

      {user ? (
        <div className="profile-card">
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Mobile:</b> {user.mobile}</p>
          <p><b>Address:</b> {user.address}</p>

          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      ) : (
        <p>No user data found</p>
      )}
    </div>
  );
}