
import React, {
  useState,
  useEffect,
  useCallback,
} from "react";

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/navbar";
import Footer from "./components/footer";

import Home from "./Pages/Home";
import Products from "./Pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Checkout from "./Pages/Checkout";
import Orders from "./Pages/Orders";
import Admin from "./Pages/Admin";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const demoProducts = [
  {
    id: "demo1",
    name: "Wireless Headphones",
    price: 1999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    description: "Comfortable wireless headphones with clear sound.",
  },
  {
    id: "demo2",
    name: "Smart Watch",
    price: 2499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    description: "Modern smartwatch for everyday use.",
  },
  {
    id: "demo3",
    name: "Running Shoes",
    price: 1799,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    description: "Lightweight shoes for daily running and walking.",
  },
  {
    id: "demo4",
    name: "Travel Backpack",
    price: 1299,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    description: "Spacious backpack for travel and everyday use.",
  },
  {
    id: "demo5",
    name: "Digital Camera",
    price: 15999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    description: "Capture your favourite moments with this camera.",
  },
  {
    id: "demo6",
    name: "Casual T-Shirt",
    price: 599,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    description: "Comfortable casual t-shirt for everyday wear.",
  },
  {
    id: "demo7",
    name: "Laptop",
    price: 45999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    description: "Laptop for work, study and entertainment.",
  },
  {
    id: "demo8",
    name: "Sunglasses",
    price: 899,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
    description: "Stylish sunglasses for everyday use.",
  },
];

async function apiRequest(endpoint, options = {}, token = "") {
  const response = await fetch(`${API}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || data.error || "Something went wrong.");
  }

  return data;
}

function App() {
  const [products, setProducts] = useState(demoProducts);
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("shopsphere-cart")) || [];
    } catch {
      return [];
    }
  });

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("shopsphere-user")) || null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("shopsphere-token") || ""
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("shopsphere-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await apiRequest("/products");
        const list = Array.isArray(data) ? data : data.products;

        if (Array.isArray(list) && list.length > 0) {
          setProducts(list);
        }
      } catch (error) {
        console.log("Using demo products:", error.message);
      }
    };

    loadProducts();
  }, []);

  const saveAuth = (data) => {
    const newToken = data.token;
    const newUser = data.user || data;

    if (!newToken) {
      throw new Error("Server did not return an authentication token.");
    }

    setToken(newToken);
    setUser(newUser);

    localStorage.setItem("shopsphere-token", newToken);
    localStorage.setItem("shopsphere-user", JSON.stringify(newUser));
  };

  const handleLogin = async (form) => {
    const data = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(form),
    });

    saveAuth(data);
  };

  const handleRegister = async (form) => {
    const data = await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(form),
    });

    saveAuth(data);
  };

  const handleLogout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("shopsphere-token");
    localStorage.removeItem("shopsphere-user");
  };

  const addToCart = (product) => {
    const productId = product._id || product.id;

    setCart((previousCart) => {
      const existing = previousCart.find(
        (item) => String(item._id || item.id) === String(productId)
      );

      if (existing) {
        return previousCart.map((item) =>
          String(item._id || item.id) === String(productId)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...product, quantity: 1 }];
    });

    alert("Product added to cart!");
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      setCart((previousCart) =>
        previousCart.filter(
          (item) => String(item._id || item.id) !== String(id)
        )
      );
      return;
    }

    setCart((previousCart) =>
      previousCart.map((item) =>
        String(item._id || item.id) === String(id)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((previousCart) =>
      previousCart.filter(
        (item) => String(item._id || item.id) !== String(id)
      )
    );
  };

  const placeOrder = async (orderData) => {
    if (!token) {
      throw new Error("Please login before placing an order.");
    }

    const data = await apiRequest(
      "/orders",
      {
        method: "POST",
        body: JSON.stringify(orderData),
      },
      token
    );

    setCart([]);
    return data;
  };

  const fetchOrders = useCallback(async () => {
    if (!token) {
      throw new Error("Please login to view your orders.");
    }

    return apiRequest("/orders/myorders", {}, token);
  }, [token]);

  const addProduct = async (productData) => {
    if (!token) {
      throw new Error("Please login as admin.");
    }

    const data = await apiRequest(
      "/products",
      {
        method: "POST",
        body: JSON.stringify(productData),
      },
      token
    );

    const newProduct = data.product || data;

    setProducts((previous) => [newProduct, ...previous]);
    return data;
  };

  const deleteProduct = async (id) => {
    if (!token) {
      throw new Error("Please login as admin.");
    }

    await apiRequest(`/products/${id}`, { method: "DELETE" }, token);

    setProducts((previous) =>
      previous.filter(
        (product) => String(product._id || product.id) !== String(id)
      )
    );
  };

  const visibleProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase())
  );

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <Navbar
        user={user}
        cartCount={cartCount}
        onLogout={handleLogout}
        search={search}
        setSearch={setSearch}
      />

      <Routes>
        <Route
          path="/"
          element={<Home products={visibleProducts} />}
        />

        <Route
          path="/products"
          element={<Products products={visibleProducts} />}
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetails
              products={products}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          }
        />

        <Route
          path="/login"
          element={
            user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
          }
        />

        <Route
          path="/register"
          element={
            user ? <Navigate to="/" /> : <Register onRegister={handleRegister} />
          }
        />

        <Route
          path="/checkout"
          element={
            user ? (
              <Checkout cart={cart} onPlaceOrder={placeOrder} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/orders"
          element={
            user ? (
              <Orders fetchOrders={fetchOrders} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/admin"
          element={
            user?.role === "admin" ? (
              <Admin
                products={products}
                onAddProduct={addProduct}
                onDeleteProduct={deleteProduct}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
