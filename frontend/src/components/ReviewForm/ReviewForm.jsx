import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ReviewForm({ songId, reviewToEdit }) {
  const [title, setTitle] = useState(reviewToEdit?.title || "");
  const [rating, setRating] = useState(reviewToEdit?.rating || 1);
  const [comment, setComment] = useState(reviewToEdit?.comment || "");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !comment || !rating) {
      setError("All fields are required");
      return;
    }

    const ratingNumber = Number(rating);

    if (ratingNumber < 1 || ratingNumber > 5) {
      setError("Rating must be between 1 and 5");
      return;
    }

    const reviewData = {
      title,
      rating: ratingNumber,
      comment,
      song: songId,
    };

    try {
      if (reviewToEdit) {
        // UPDATE
        const res = await fetch(
          `http://localhost:5000/api/reviews/${reviewToEdit._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(reviewData),
          },
        );

        if (!res.ok) throw new Error("Update failed");

        navigate("/my-reviews");
      } else {
        // CREATE
        const res = await fetch("http://localhost:5000/api/reviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData),
        });

        if (!res.ok) throw new Error("Create failed");

        navigate(`/songs/${songId}`);
      }
    } catch (err) {
      console.log(err);
      setError("Error while saving review");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h3>{reviewToEdit ? "Edit Review" : "Add Review"}</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Review title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        min="1"
        max="5"
        placeholder="Rating (1-5)"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      <textarea
        placeholder="Your comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button type="submit">
        {reviewToEdit ? "Update Review" : "Submit Review"}
      </button>
    </form>
  );
}

export default ReviewForm;
