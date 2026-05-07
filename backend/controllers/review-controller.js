import { Review } from "../models/Review.js";

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("song", "title artist");

    res.status(200).json(reviews);
  } catch (err) {
    console.log("GET REVIEWS ERROR:", err);
    res.status(500).json([]);
  }
};

const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate(
      "song",
      "title artist",
    );

    if (!review) {
      return res.status(404).json({ message: "Review non trouvé" });
    }

    res.status(200).json(review);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const getReviewsBySong = async (req, res) => {
  try {
    const reviews = await Review.find({
      song: req.params.songId,
    }).populate("song", "title artist");

    res.status(200).json(reviews);
  } catch (err) {
    console.log(err);
    res.status(500).json([]);
  }
};

const postReview = async (req, res) => {
  try {
    const review = new Review({
      title: req.body.title,
      rating: req.body.rating,
      comment: req.body.comment,
      song: req.body.song,
    });

    await review.save();

    res.status(201).json(review);
  } catch (err) {
    console.log("CREATE REVIEW ERROR:", err);
    res.status(500).json({
      message: "Erreur création review",
      error: err.message,
    });
  }
};

const updateReviews = async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "Review non trouvée" });
    }

    res.status(200).json(updatedReview);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur update review" });
  }
};

const deleteReviews = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review non trouvée." });
    }

    res.status(200).json({ message: "Review supprimée" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur delete review" });
  }
  console.log("DELETE ID:", req.params.id);
};

export default {
  getReviews,
  getReviewsBySong,
  postReview,
  getReviewById,
  updateReviews,
  deleteReviews,
};
