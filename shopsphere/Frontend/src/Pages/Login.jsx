
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await onLogin?.(form);
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    page: {
      minHeight: "70vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f5f6fa",
      padding: "30px",
    },
    box: {
      width: "100%",
      maxWidth: "400px",
      background: "white",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 3px 12px #ddd",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "10px 0",
      boxSizing: "border-box",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    button: {
      width: "100%",
      padding: "12px",
      background: "#ff9900",
      border: "none",
      borderRadius: "5px",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "12px",
    },
  };

  return (
    <div style={styles.page}>
      <form style={styles.box} onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center" }}>Login</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <label>Email Address</label>
        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          style={styles.input}
          type="password"
          name="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={{ textAlign: "center", marginTop: "18px" }}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
