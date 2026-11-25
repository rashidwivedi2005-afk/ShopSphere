
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register({ onRegister }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      await onRegister?.({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
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
      maxWidth: "420px",
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
        <h1 style={{ textAlign: "center" }}>Create Account</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <label>Full Name</label>
        <input
          style={styles.input}
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={form.name}
          onChange={handleChange}
          required
        />

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
          placeholder="Create password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <label>Confirm Password</label>
        <input
          style={styles.input}
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p style={{ textAlign: "center", marginTop: "18px" }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
