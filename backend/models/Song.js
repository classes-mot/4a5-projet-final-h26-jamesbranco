import mongoose from "mongoose";

const songSchema = mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  genre: { type: String },
});

export const Song = mongoose.model("Song", songSchema);
