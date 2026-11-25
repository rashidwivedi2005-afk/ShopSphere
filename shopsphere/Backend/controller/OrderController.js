
const Order = require("../model/Order");
const Product = require("../model/Product");

const placeOrder = async (req, res) => {
  try {
    const {
      items,
      cart,
      address,
      city,
      pincode,
      phone,
      paymentMethod
    } = req.body;

    const cartItems = items || cart;

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({
        message: "Your cart is empty."
      });
    }

    if (!address || !city || !pincode || !phone) {
      return res.status(400).json({
        message: "Please provide complete delivery details."
      });
    }

    const method = paymentMethod || "COD";

    if (!["COD", "DEMO"].includes(method)) {
      return res.status(400).json({
        message: "Invalid payment method."
      });
    }

    const orderItems = [];
    let totalPrice = 0;

    for (const item of cartItems) {
      const productId = item.product || item._id || item.id;
      const quantity = Number(item.quantity);

      if (
        !productId ||
        !Number.isInteger(quantity) ||
        quantity < 1
      ) {
        return res.status(400).json({
          message: "Invalid cart item."
        });
      }

      if (!/^[0-9a-fA-F]{24}$/.test(String(productId))) {
        return res.status(400).json({
          message: "Demo products cannot be ordered. Please add database products."
        });
      }

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          message: "Product not found."
        });
      }

      if (product.stock < quantity) {
        return res.status(400).json({
          message: `${product.name} has insufficient stock.`
        });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity
      });

      totalPrice += product.price * quantity;
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalPrice,
      address,
      city,
      pincode,
      phone,
      paymentMethod: method
    });

    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      });
    }

    res.status(201).json({
      message: "Order placed successfully.",
      order
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id
    }).sort({
      createdAt: -1
    });

    res.status(200).json({
      orders
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  placeOrder,
  getMyOrders
};
