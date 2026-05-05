import ReviewForm from "../components/ReviewForm/ReviewForm";
import { useParams } from "react-router-dom";

export default function AddReview() {
  const { songId } = useParams();

  return (
    <div>
      <h2>Add Review</h2>
      <ReviewForm songId={songId} />
    </div>
  );
}
