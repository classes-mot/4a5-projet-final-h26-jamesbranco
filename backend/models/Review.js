import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  genre: { type: String },
  rating: { type: Number },
  comment: { type: String },
});

export const User = mongoose.model("Review", reviewSchema);
