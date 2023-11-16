import mongoose from "mongoose";
let GalleryImage;
try {
  // Attempt to fetch the existing model if it exists
  GalleryImage = mongoose.model("GalleryImage");
} catch (error) {
  // If the model doesn't exist, define it
  const GalleryImageSchema = new mongoose.Schema({
    title: String,
    imageSrc: String,
    public_id: String,
  });

  GalleryImage = mongoose.model("GalleryImage", GalleryImageSchema);
}

export default GalleryImage;
