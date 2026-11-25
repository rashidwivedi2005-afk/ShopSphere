
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const styles = {
    footer: {
      backgroundColor: "#131921",
      color: "white",
      padding: "35px 5%",
      marginTop: "50px",
    },
    container: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "25px",
    },
    heading: {
      color: "#ff9900",
      marginBottom: "12px",
    },
    link: {
      display: "block",
      color: "#ddd",
      textDecoration: "none",
      marginBottom: "9px",
      fontSize: "14px",
    },
    bottom: {
      textAlign: "center",
      borderTop: "1px solid #444",
      paddingTop: "18px",
      marginTop: "25px",
      fontSize: "13px",
      color: "#bbb",
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div>
          <h2 style={styles.heading}>ShopSphere</h2>
          <p>Your one-stop online shopping destination.</p>
        </div>

        <div>
          <h3 style={styles.heading}>Quick Links</h3>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/products" style={styles.link}>Products</Link>
          <Link to="/cart" style={styles.link}>Cart</Link>
        </div>

        <div>
          <h3 style={styles.heading}>Customer Service</h3>
          <Link to="/orders" style={styles.link}>My Orders</Link>
          <Link to="/login" style={styles.link}>My Account</Link>
        </div>
      </div>

      <div style={styles.bottom}>
        © {new Date().getFullYear()} ShopSphere. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
