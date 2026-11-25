
import React from "react";
import { Link } from "react-router-dom";

function Home({ products = [] }) {
  const categories = [
    "Electronics",
    "Fashion",
    "Footwear",
    "Accessories",
    "Home Appliances",
  ];

  const styles = {
    page: {
      padding: "30px 5%",
      backgroundColor: "#f5f6fa",
      minHeight: "70vh",
    },
    hero: {
      background: "linear-gradient(120deg, #131921, #30445c)",
      color: "white",
      padding: "65px 35px",
      borderRadius: "12px",
      textAlign: "center",
    },
    button: {
      display: "inline-block",
      backgroundColor: "#ff9900",
      color: "#131921",
      padding: "12px 25px",
      borderRadius: "6px",
      textDecoration: "none",
      fontWeight: "bold",
      marginTop: "15px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
      gap: "18px",
      marginTop: "20px",
    },
    category: {
      backgroundColor: "white",
      padding: "25px 15px",
      textAlign: "center",
      borderRadius: "10px",
      fontWeight: "bold",
      boxShadow: "0 2px 8px #ddd",
    },
    products: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "20px",
      marginTop: "20px",
    },
    card: {
      backgroundColor: "white",
      padding: "18px",
      borderRadius: "10px",
      textAlign: "center",
      boxShadow: "0 2px 8px #ddd",
    },
    image: {
      width: "100%",
      height: "170px",
      objectFit: "contain",
    },
  };

  const featured = products.slice(0, 4);

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <h1>Welcome to ShopSphere</h1>
        <h2>Discover Amazing Products at Great Prices</h2>
        <p>Shop electronics, fashion, accessories and much more.</p>
        <Link to="/products" style={styles.button}>
          Shop Now
        </Link>
      </section>

      <section style={{ marginTop: "40px" }}>
        <h2>Shop By Categories</h2>
        <div style={styles.grid}>
          {categories.map((category) => (
            <Link
              key={category}
              to={`/products?category=${encodeURIComponent(category)}`}
              style={{ textDecoration: "none", color: "#131921" }}
            >
              <div style={styles.category}>{category}</div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginTop: "40px" }}>
        <h2>Featured Products</h2>

        <div style={styles.products}>
          {featured.map((product) => (
            <div key={product._id || product.id} style={styles.card}>
              <img
                src={product.image || "https://placehold.co/300x200?text=Product"}
                alt={product.name}
                style={styles.image}
              />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <Link
                to={`/product/${product._id || product.id}`}
                style={styles.button}
              >
                View Product
              </Link>
            </div>
          ))}

          {featured.length === 0 && (
            <p>Products will appear here once available.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
