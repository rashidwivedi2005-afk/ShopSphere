
import React from "react";
import { Link, useParams } from "react-router-dom";

function ProductDetails({ products = [], addToCart }) {
  const { id } = useParams();

  const product = products.find(
    (item) => String(item._id || item.id) === String(id)
  );

  const styles = {
    page: {
      padding: "40px 5%",
      background: "#f5f6fa",
      minHeight: "70vh",
    },
    container: {
      display: "flex",
      gap: "40px",
      flexWrap: "wrap",
      background: "white",
      padding: "30px",
      borderRadius: "12px",
    },
    image: {
      width: "100%",
      maxWidth: "400px",
      height: "350px",
      objectFit: "contain",
    },
    details: {
      flex: "1",
      minWidth: "250px",
    },
    button: {
      background: "#ff9900",
      border: "none",
      padding: "12px 22px",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
      marginRight: "10px",
    },
  };

  if (!product) {
    return (
      <div style={styles.page}>
        <h2>Product not found</h2>
        <Link to="/products">Back to Products</Link>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <img
          src={product.image || "https://placehold.co/400x350?text=Product"}
          alt={product.name}
          style={styles.image}
        />

        <div style={styles.details}>
          <h1>{product.name}</h1>
          <p>Category: {product.category}</p>
          <h2 style={{ color: "#b12704" }}>₹{product.price}</h2>
          <p>{product.description || "No description available."}</p>
          <p>Availability: In Stock</p>

          <button
            style={styles.button}
            onClick={() => addToCart?.(product)}
          >
            Add to Cart
          </button>

          <Link to="/products">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
