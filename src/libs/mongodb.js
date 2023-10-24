import mongoose from "mongoose";
const cloudinary = require("cloudinary").v2;
require("dotenv").config({ path: ".env.local" });
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_API_KEY,
  api_secret: process.env.NEXT_API_SECRET,
});
const connectMongoDB = async () => {
  try {
    await mongoose
      .connect(
        process.env.NEXT_PUBLIC_MONGODB_URL,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => {
        console.log("DB connected");
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
      });
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
