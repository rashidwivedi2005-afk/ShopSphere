
import React, { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function Products({ products = [] }) {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("default");

  const categories = [
    "Electronics",
    "Fashion",
    "Footwear",
    "Accessories",
    "Home Appliances",
  ];

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory =
        !category ||
        product.category?.toLowerCase() === category.toLowerCase();

      return matchesCategory;
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, category, sort]);

  const styles = {
    page: {
      padding: "30px 5%",
      backgroundColor: "#f5f6fa",
      minHeight: "70vh",
    },
    controls: {
      display: "flex",
      gap: "15px",
      flexWrap: "wrap",
      margin: "20px 0",
    },
    select: {
      padding: "11px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      backgroundColor: "white",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "20px",
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
      height: "180px",
      objectFit: "contain",
    },
    button: {
      display: "inline-block",
      backgroundColor: "#ff9900",
      color: "#131921",
      padding: "10px 18px",
      borderRadius: "5px",
      textDecoration: "none",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.page}>
      <h1>All Products</h1>
      <p>Explore our collection of products.</p>

      <div style={styles.controls}>
        <select
          style={styles.select}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>

        <select
          style={styles.select}
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <div style={styles.grid}>
        {filteredProducts.map((product) => (
          <div key={product._id || product.id} style={styles.card}>
            <img
              src={product.image || "https://placehold.co/300x200?text=Product"}
              alt={product.name}
              style={styles.image}
            />
            <h3>{product.name}</h3>
            <p>{product.category}</p>
            <h3>₹{product.price}</h3>
            <Link
              to={`/product/${product._id || product.id}`}
              style={styles.button}
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p style={{ marginTop: "30px" }}>No products found in this category.</p>
      )}
    </div>
  );
}

export default Products;
