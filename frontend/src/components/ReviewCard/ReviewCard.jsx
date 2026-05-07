import { useAuth } from "../AuthContext/AuthContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ReviewCard({ review, onDelete }) {
  const { isLoggedIn } = useAuth();
  const { t } = useTranslation();

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/reviews/${review._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await res.json();
      console.log("DELETE RESPONSE:", data);

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }
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
      {review.user?.username && (
        <p>
          {t("by")} {review.user.username}
        </p>
      )}

      {/* SONG */}
      {review.song?.title && (
        <p>
          {t("song")}: {review.song.title}
        </p>
      )}

      {/* ACTIONS */}
      <div className="review-actions">
        {isLoggedIn && (
          <Link to={`/reviews/edit/${review._id}`} className="btn edit">
            {t("edit")}
          </Link>
        )}

        {isLoggedIn && (
          <button onClick={handleDelete} className="btn delete">
            {t("delete")}
          </button>
        )}
      </div>
    </div>
  );
}

export default ReviewCard;
