import { useAuth } from "../AuthContext/AuthContext";
import { Link } from "react-router-dom";

function ReviewCard({ review, onDelete }) {
  const { isLoggedIn } = useAuth();

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/reviews/${review._id}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();
      console.log("DELETE RESPONSE:", data);

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      if (onDelete) onDelete(review._id);
    } catch (err) {
      console.log("Error deleting review", err);
    }
  };

  return (
    <div className="review-card">
      {/* TITLE */}
      <h4>{review.title}</h4>

      {/* COMMENT */}
      <p>{review.comment}</p>

      {/* RATING */}
      <p>⭐ {review.rating}/5</p>

      {/* USER */}
      {review.user?.username && <p>By: {review.user.username}</p>}

      {/* SONG */}
      {review.song?.title && <p>Song: {review.song.title}</p>}

      {/* ACTIONS */}
      <div className="review-actions">
        {isLoggedIn && (
          <Link to={`/reviews/edit/${review._id}`} className="btn edit">
            Edit
          </Link>
        )}

        {isLoggedIn && (
          <button onClick={() => onDelete(review._id)} className="btn delete">
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default ReviewCard;
