import ReviewForm from "../components/ReviewForm/ReviewForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditReview() {
  const { id } = useParams();
  const [review, setReview] = useState(null);

  useEffect(() => {
    async function fetchReview() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews/${id}`);

        const data = await res.json();

        setReview(data.review || data);
      } catch (err) {
        console.log("Error fetching review:", err);
      }
    }

    fetchReview();
  }, [id]);

  if (!review) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Review</h2>
      <ReviewForm reviewToEdit={review} songId={review.song} />
    </div>
  );
}
