import express from "express";
import reviewController from "../controllers/review-controller.js";
import { check } from "express-validator";
import checkAuth from "../middleware/check-auth.js";

const router = express.Router();

router.get("/", reviewController.getReviews);

router.get("/:id", reviewController.getReviewById);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("artist").not().isEmpty(),
    check("genre").not().isEmpty(),
    check("rating").isNumeric(),
    check("comment").not().isEmpty(),
    checkAuth,
  ],
  reviewController.postReview,
);

router.patch("/:id", [checkAuth], reviewController.updateReviews);

router.delete("/:id", [checkAuth], reviewController.deleteReviews);

export default router;
