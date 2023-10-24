import mongoose from "mongoose";
let Review;
try {
  // Attempt to fetch the existing model if it exists
  Review = mongoose.model("Review");
} catch (error) {
  // If the model doesn't exist, define it
  const ReviewSchema = new mongoose.Schema({
    name: String,
    Rateing: Number,
    review: String
  });

  Review = mongoose.model("Review", ReviewSchema);
}

export default Review;
