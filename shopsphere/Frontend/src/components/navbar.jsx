
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ user, cartCount = 0, onLogout, search, setSearch }) {
  const navigate = useNavigate();

  const styles = {
    nav: {
      backgroundColor: "#131921",
      color: "white",
      padding: "15px 5%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "20px",
      flexWrap: "wrap",
    },
    logo: {
      color: "#ff9900",
      fontSize: "26px",
      fontWeight: "bold",
      textDecoration: "none",
    },
    search: {
      flex: "1",
      minWidth: "180px",
      maxWidth: "450px",
      padding: "11px",
      borderRadius: "5px",
      border: "none",
      outline: "none",
      fontSize: "14px",
    },
    links: {
      display: "flex",
      alignItems: "center",
      gap: "18px",
      flexWrap: "wrap",
    },
    link: {
      color: "white",
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: "500",
    },
    button: {
      backgroundColor: "#ff9900",
      color: "#131921",
      border: "none",
      padding: "9px 14px",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
    },
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        ShopSphere
      </Link>

      <input
        type="text"
        placeholder="Search products..."
        value={search || ""}
        onChange={(e) => setSearch?.(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") navigate("/products");
        }}
        style={styles.search}
      />

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/products" style={styles.link}>Products</Link>
        <Link to="/cart" style={styles.link}>
          Cart ({cartCount})
        </Link>

        {user ? (
          <>
            <Link to="/orders" style={styles.link}>My Orders</Link>

            {user.role === "admin" && (
              <Link to="/admin" style={styles.link}>Admin</Link>
            )}

            <span style={styles.link}>
              Hi, {user.name || "User"}
            </span>

            <button onClick={onLogout} style={styles.button}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
