import express from "express";
import reviewController from "../controllers/review-controller.js";
import { check } from "express-validator";
import checkAuth from "../middleware/check-auth.js";

const router = express.Router();

router.get("/song/:songId", reviewController.getReviewsBySong);

router.get("/", reviewController.getReviews);

router.get("/:id", reviewController.getReviewById);

router.post(
  "/",
  checkAuth,
  /* [
    check("title").not().isEmpty(),
    check("rating").isNumeric(),
    check("comment").not().isEmpty(),
    check("song").not().isEmpty(),
  ], */
  reviewController.postReview,
);

router.patch("/:id", reviewController.updateReviews);

router.delete("/:id", reviewController.deleteReviews);

export default router;
