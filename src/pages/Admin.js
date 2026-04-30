import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./Admin.css";

export default function Admin() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    desc: ""
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);

  // 📥 Fetch products
  const fetchProducts = async () => {
    const res = await fetch(`${API}/products`);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 📝 Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 📸 Image preview
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ➕ ADD / UPDATE
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("desc", form.desc);
    if (image) formData.append("image", image);

    let url = `${API}/product/add`;
    let method = "POST";

    if (editId) {
      url = `${API}/product/${editId}`;
      method = "PUT";
    }

    await fetch(url, {
      method,
      body: formData
    });

    alert(editId ? "✅ Product Updated" : "✅ Product Added");

    setForm({ name: "", price: "", desc: "" });
    setImage(null);
    setPreview("");
    setEditId(null);

    fetchProducts();
  };

  // ❌ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await fetch(`${API}/product/${id}`, {
      method: "DELETE"
    });

    fetchProducts();
  };

  // ✏️ EDIT
  const handleEdit = (p) => {
    setForm({
      name: p.name,
      price: p.price,
      desc: p.desc
    });
    setEditId(p._id);
    setPreview(`http://localhost:5000/uploads/${p.image}`);
  };

  return (
    <div className="admin-container">
      <h2>🛠️ Admin Panel</h2>

      {/* FORM */}
      <div className="form-box">
        <input
          name="name"
          value={form.name}
          placeholder="Product Name"
          onChange={handleChange}
        />

        <input
          name="price"
          value={form.price}
          placeholder="Price"
          onChange={handleChange}
        />

        <input
          name="desc"
          value={form.desc}
          placeholder="Description"
          onChange={handleChange}
        />

        <input type="file" onChange={handleImage} />

        {/* IMAGE PREVIEW */}
        {preview && (
          <img src={preview} alt="preview" className="preview-img" />
        )}

        <button onClick={handleSubmit}>
          {editId ? "Update Product" : "Add Product"}
        </button>
      </div>

      <hr />

      {/* PRODUCT LIST */}
      <h3>All Products</h3>

      <div className="product-list">
        {products.map((p) => (
          <div className="product-item" key={p._id}>
            <img
              src={`http://localhost:5000/uploads/${p.image}`}
              alt={p.name}
            />

            <div className="info">
              <b>{p.name}</b>
              <p>₹{p.price}</p>
            </div>

            <div className="actions">
              <button onClick={() => handleEdit(p)}>✏️</button>
              <button onClick={() => handleDelete(p._id)}>❌</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}