
const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const connectdb = require("./config/db");

const userRoutes = require("./routes/UserRoutes");
const loginRoutes = require("./routes/LoginRoutes");
const productRoutes = require("./routes/ProductRoutes");
const dashboardRoutes = require("./routes/DashboardRoutes");
const getProductRoutes = require("./routes/GetProductRoutes");
const orderRoutes = require("./routes/OrderRoutes");

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

// Database
connectdb();

// API Routes
app.use("/api", userRoutes);
app.use("/api", loginRoutes);
app.use("/api", productRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", getProductRoutes);
app.use("/api/orders", orderRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("ShopSphere Backend is Running!");
});

// Error for unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: "API route not found."
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`ShopSphere Server running on port ${PORT}`);
});
