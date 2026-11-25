
import React from "react";
import { Link } from "react-router-dom";

function Cart({ cart = [], updateQuantity, removeFromCart }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const styles = {
    page: {
      padding: "35px 5%",
      background: "#f5f6fa",
      minHeight: "70vh",
    },
    item: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      flexWrap: "wrap",
      background: "white",
      padding: "20px",
      marginBottom: "15px",
      borderRadius: "10px",
    },
    image: {
      width: "110px",
      height: "100px",
      objectFit: "contain",
    },
    button: {
      padding: "8px 13px",
      border: "none",
      borderRadius: "5px",
      background: "#ff9900",
      cursor: "pointer",
      fontWeight: "bold",
      margin: "0 5px",
    },
    checkout: {
      display: "inline-block",
      padding: "12px 25px",
      background: "#131921",
      color: "white",
      textDecoration: "none",
      borderRadius: "5px",
      marginTop: "15px",
    },
  };

  return (
    <div style={styles.page}>
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <div>
          <h3>Your cart is empty.</h3>
          <Link to="/products">Continue Shopping</Link>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id || item.id} style={styles.item}>
              <img
                src={item.image || "https://placehold.co/110x100?text=Product"}
                alt={item.name}
                style={styles.image}
              />

              <div style={{ flex: 1 }}>
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <p>
                  Quantity:
                  <button
                    style={styles.button}
                    onClick={() =>
                      updateQuantity?.(item._id || item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    style={styles.button}
                    onClick={() =>
                      updateQuantity?.(item._id || item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </p>
                <button
                  style={{ ...styles.button, background: "#dc3545", color: "white" }}
                  onClick={() => removeFromCart?.(item._id || item.id)}
                >
                  Remove
                </button>
              </div>

              <h3>₹{item.price * item.quantity}</h3>
            </div>
          ))}

          <div style={{ textAlign: "right", marginTop: "25px" }}>
            <h2>Total: ₹{total}</h2>
            <Link to="/checkout" style={styles.checkout}>
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
