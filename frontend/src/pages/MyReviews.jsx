import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReviewCard from "../components/ReviewCard/ReviewCard";
import { useAuth } from "../components/AuthContext/AuthContext";
import { useTranslation } from "react-i18next";

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews`);

        if (!res.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const data = await res.json();

        setReviews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log(err);
        setError("Error loading reviews");
      } finally {
        setLoading(false);
      }
    }

    if (isLoggedIn) {
      fetchReviews();
    }
  }, [isLoggedIn]);

  // Delete review
  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/reviews/${id}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.log("DELETE ERROR:", err);
    }
  };

  // Prevent render before redirect
  if (!isLoggedIn) return null;

  if (loading) {
    return <p>{t("common.loading")}</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{t(error)}</p>;
  }

  return (
    <div className="my-reviews-page">
      <h2>{t("reviews.title")}</h2>

      {reviews.length === 0 ? (
        <p>{t("reviews.noReviews")}</p>
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
