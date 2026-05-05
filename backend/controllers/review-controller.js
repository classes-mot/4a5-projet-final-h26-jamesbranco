import { Review } from "../models/Review.js";
import mongoose from "mongoose";

const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .populate("user", "username")
      .populate("song", "title artist");

    res.json(reviews);
  } catch (err) {
    return next(new Error("Erreur lors de la recuperations des reviews"));
  }
};

const getReviewById = async (req, res, next) => {
  const reviewId = req.params.id;

  let review;
  try {
    review = await Review.findById(reviewId)
      .populate("user", "username")
      .populate("song", "title artist");
  } catch (err) {
    console.log(err);
    return next(new Error("erreur"));
  }

  if (!review) {
    return res.status(404).json({ message: "Review non trouvé" });
  }

  res.json({ review: review.toObject({ getters: true }) });
};

const getReviewsBySong = async (req, res, next) => {
  const songId = req.params.songId;

  try {
    const reviews = await Review.find({ song: songId }).populate(
      "user",
      "username",
    );

    res.json(reviews);
  } catch (err) {
    return next(new Error("Erreur"));
  }
};

const postReview = async (req, res, next) => {
  const review = new Review({
    title: req.body.title,
    rating: req.body.rating,
    comment: req.body.comment,
    song: req.body.song,
    user: req.user.id,
  });

  try {
    await review.save();
  } catch (err) {
    return next(new Error("Erreur lors de la creation"));
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
  getReviewsBySong,
  postReview,
  getReviewById,
  updateReviews,
  deleteReviews,
};
