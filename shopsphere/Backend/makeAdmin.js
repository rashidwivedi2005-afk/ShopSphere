
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./model/User");

dotenv.config();

const makeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const email = process.env.ADMIN_EMAIL?.toLowerCase().trim();

    if (!email) {
      throw new Error("Add ADMIN_EMAIL in .env first.");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Register this email on ShopSphere first.");
    }

    user.role = "admin";
    await user.save();

    console.log("Admin role assigned successfully:", email);

    await mongoose.disconnect();
    process.exit(0);

  } catch (error) {
    console.error("Admin setup failed:", error.message);
    process.exit(1);
  }
};

makeAdmin();
