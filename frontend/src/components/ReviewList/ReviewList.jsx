import { useEffect, useState } from "react";
import ReviewCard from "../ReviewCard/ReviewCard";
import "./ReviewList.css";

const API_URL = import.meta.env.VITE_API_URL;

function ReviewList({ songId }) {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // FETCH reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        let url = `${API_URL}/api/reviews`;

        if (songId) {
          url = `${API_URL}/api/reviews/song/${songId}`;
        }

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Failed to load reviews");
        }

        const data = await res.json();

        setReviews(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Error loading reviews");
        setLoading(false);
      }
    };

    fetchReviews();
  }, [songId]);

  //  DELETE (backend + UI)
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/reviews/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.log("Delete Error:", err);
    }
  };

  if (loading) return <p className="loading">Loading reviews...</p>;

  if (error) return <p className="error">{error}</p>;

  return (
    <div className="review-list">
      {reviews.length === 0 ? (
        <p>No reviews found</p>
      ) : (
        reviews.map((review) => (
          <ReviewCard
            key={review._id}
            review={review}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}

export default ReviewList;
