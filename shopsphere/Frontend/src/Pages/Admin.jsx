
import React, { useState } from "react";

function Admin({ products = [], onAddProduct, onDeleteProduct }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "Electronics",
    image: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      await onAddProduct?.({
        ...form,
        price: Number(form.price),
      });

      setForm({
        name: "",
        price: "",
        category: "Electronics",
        image: "",
        description: "",
      });

      setMessage("Product added successfully!");
    } catch (err) {
      setMessage(err.message || "Unable to add product.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    page: {
      padding: "30px 5%",
      background: "#f5f6fa",
      minHeight: "70vh",
    },
    box: {
      background: "white",
      padding: "25px",
      borderRadius: "10px",
      marginBottom: "30px",
      boxShadow: "0 2px 8px #ddd",
      maxWidth: "650px",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "8px 0 15px",
      boxSizing: "border-box",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    button: {
      padding: "11px 18px",
      background: "#ff9900",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    product: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "15px",
      flexWrap: "wrap",
      background: "white",
      padding: "15px",
      marginBottom: "12px",
      borderRadius: "8px",
    },
  };

  return (
    <div style={styles.page}>
      <h1>Admin Dashboard</h1>
      <p>Manage your ShopSphere products.</p>

      <form style={styles.box} onSubmit={handleSubmit}>
        <h2>Add New Product</h2>

        {message && <p>{message}</p>}

        <label>Product Name</label>
        <input
          style={styles.input}
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter product name"
          required
        />

        <label>Price</label>
        <input
          style={styles.input}
          name="price"
          type="number"
          min="1"
          value={form.price}
          onChange={handleChange}
          placeholder="Enter price"
          required
        />

        <label>Category</label>
        <select
          style={styles.input}
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option>Electronics</option>
          <option>Fashion</option>
          <option>Footwear</option>
          <option>Accessories</option>
          <option>Home Appliances</option>
        </select>

        <label>Image URL</label>
        <input
          style={styles.input}
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Enter product image URL"
        />

        <label>Description</label>
        <textarea
          style={styles.input}
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter product description"
          rows="4"
        />

        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>

      <h2>Manage Products ({products.length})</h2>

      {products.map((product) => (
        <div
          key={product._id || product.id}
          style={styles.product}
        >
          <div>
            <strong>{product.name}</strong>
            <p>₹{product.price} | {product.category}</p>
          </div>

          <button
            style={{ ...styles.button, background: "#dc3545", color: "white" }}
            onClick={() => onDeleteProduct?.(product._id || product.id)}
          >
            Delete
          </button>
        </div>
      ))}

      {products.length === 0 && <p>No products available.</p>}
    </div>
  );
}

export default Admin;
