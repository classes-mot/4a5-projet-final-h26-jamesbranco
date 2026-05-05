import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReviewCard from "../components/ReviewCard/ReviewCard";
import { useAuth } from "../components/AuthContext/AuthContext";

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  // 📥 FETCH
  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("http://localhost:5000/api/reviews");
        const data = await res.json();

        setReviews(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Error loading reviews");
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  // ❌ DELETE
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/reviews/${id}`, {
        method: "DELETE",
      });

      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  if (!isLoggedIn) {
    return <p>You must be logged in to view this page.</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>

        <button onClick={() => navigate("/reviews/add")}>Add Review</button>
      </nav>

      <h2>My Reviews</h2>

      {reviews.length === 0 ? (
        <p>No reviews yet</p>
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
