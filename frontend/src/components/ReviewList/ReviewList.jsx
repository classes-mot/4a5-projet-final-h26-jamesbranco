import { useEffect, useState } from "react";
import ReviewCard from "../ReviewCard/ReviewCard";

function ReviewList({ songId }) {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // 📥 FETCH reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        let url = "http://localhost:5000/api/reviews";

        if (songId) {
          url = `http://localhost:5000/api/reviews/song/${songId}`;
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

  // ❌ DELETE (backend + UI)
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/reviews/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="review-list">
      <h3>Reviews</h3>

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
