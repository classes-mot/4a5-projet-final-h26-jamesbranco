import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  title: { type: String, required: true },
  rating: { type: Number },
  comment: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  song: { type: mongoose.Schema.Types.ObjectId, ref: "Song" },
});

export const Review = mongoose.model("Review", reviewSchema);
