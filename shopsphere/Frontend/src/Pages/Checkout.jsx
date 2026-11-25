
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cart = [], onPlaceOrder }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    address: "",
    city: "",
    pincode: "",
    phone: "",
    paymentMethod: "COD",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      await onPlaceOrder?.({
        items: cart,
        shippingAddress: `${form.address}, ${form.city}, ${form.pincode}`,
        phone: form.phone,
        paymentMethod: form.paymentMethod,
        totalPrice,
      });

      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      setError(err.message || "Unable to place order.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    page: {
      padding: "35px 5%",
      background: "#f5f6fa",
      minHeight: "70vh",
    },
    box: {
      maxWidth: "650px",
      margin: "auto",
      background: "white",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 3px 12px #ddd",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "9px 0 18px",
      boxSizing: "border-box",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    button: {
      width: "100%",
      padding: "13px",
      background: "#ff9900",
      border: "none",
      borderRadius: "5px",
      fontWeight: "bold",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.page}>
      <form style={styles.box} onSubmit={handleSubmit}>
        <h1>Checkout</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <h3>Shipping Details</h3>

        <label>Full Address</label>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="House number, street, area"
          style={styles.input}
          required
        />

        <label>City</label>
        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="Enter city"
          style={styles.input}
          required
        />

        <label>PIN Code</label>
        <input
          name="pincode"
          value={form.pincode}
          onChange={handleChange}
          placeholder="6 digit PIN code"
          maxLength="6"
          pattern="[0-9]{6}"
          style={styles.input}
          required
        />

        <label>Phone Number</label>
        <input
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="10 digit mobile number"
          maxLength="10"
          pattern="[0-9]{10}"
          style={styles.input}
          required
        />

        <h3>Payment Method</h3>

        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="COD">Cash on Delivery</option>
          <option value="DEMO">Demo Online Payment</option>
        </select>

        <h2>Total Amount: ₹{totalPrice}</h2>

        <button
          type="submit"
          style={styles.button}
          disabled={loading || cart.length === 0}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}

export default Checkout;
