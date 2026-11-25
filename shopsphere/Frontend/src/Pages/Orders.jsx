
import React, { useEffect, useState } from "react";

function Orders({ fetchOrders }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchOrders?.();

        if (active) {
          setOrders(Array.isArray(data) ? data : data?.orders || []);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load orders.");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadOrders();

    return () => {
      active = false;
    };
  }, [fetchOrders]);

  const styles = {
    page: {
      padding: "35px 5%",
      background: "#f5f6fa",
      minHeight: "70vh",
    },
    card: {
      background: "white",
      padding: "22px",
      marginBottom: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 8px #ddd",
    },
    status: {
      display: "inline-block",
      background: "#e5f7e9",
      color: "#16833b",
      padding: "6px 12px",
      borderRadius: "5px",
      fontWeight: "bold",
    },
  };

  if (loading) {
    return <div style={styles.page}>Loading your orders...</div>;
  }

  return (
    <div style={styles.page}>
      <h1>My Orders</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!error && orders.length === 0 && (
        <h3>You have not placed any orders yet.</h3>
      )}

      {orders.map((order) => (
        <div key={order._id || order.id} style={styles.card}>
          <h3>Order ID: {order._id || order.id}</h3>

          <p>
            Order Date:{" "}
            {order.createdAt
              ? new Date(order.createdAt).toLocaleDateString()
              : "Not available"}
          </p>

          <p>
            Total Amount: ₹
            {order.totalPrice}
          </p>

          <p>Payment Method: {order.paymentMethod}</p>

          <p>
            Status:{" "}
            <span style={styles.status}>
              {order.status || "Processing"}
            </span>
          </p>

          <h4>Ordered Products</h4>

          {(order.items || []).map((item, index) => (
            <p key={item._id || item.product || index}>
              {item.name || item.product?.name || "Product"} ×{" "}
              {item.quantity}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Orders;
