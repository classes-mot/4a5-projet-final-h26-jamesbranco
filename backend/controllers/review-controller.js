import { Review } from "../models/Review.js";
import mongoose from "mongoose";

const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    return next(new Error("erreur"));
  }
};

const getReviewById = async (req, res, next) => {
  const reviewId = req.params.id;

  let review;
  try {
    review = await Review.findById(reviewId);
  } catch (err) {
    console.log(err);
    return next(new Error("erreur"));
  }

  if (!review) {
    return res.status(404).json({ message: "Review non trouvé" });
  }

  res.json({ review: review.toObject({ getters: true }) });
};

const postReview = async (req, res, next) => {
  const review = new Review({
    title: req.body.title,
    artist: req.body.artist,
    genre: req.body.genre,
    rating: req.body.rating,
    comment: req.body.comment,
  });

  try {
    await review.save();
  } catch (err) {
    return next(new Error("erreur"));
  }
  res.status(201).json(review);
};

const updateReviews = async (req, res, next) => {
  const reviewId = req.params.id;
  const reviewUpdates = req.body;

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      reviewUpdates,
      {
        new: true,
      },
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "Review non trouvée..." });
    }

    res.status(200).json({ review: updatedReview.toObject({ getters: true }) });
  } catch (err) {
    return next(new Error("erreur"));
  }
};

const deleteReviews = async (req, res, next) => {
  const reviewId = req.params.id;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review non trouvée." });
    }
    await review.deleteOne();

    res.status(200).json({ message: "Review supprimer" });
  } catch (err) {
    return next(new Error("erreur"));
  }
};

export default {
  getReviews,
  postReview,
  getReviewById,
  updateReviews,
  deleteReviews,
};
