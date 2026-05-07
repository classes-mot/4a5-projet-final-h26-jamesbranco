import ReviewForm from "../components/ReviewForm/ReviewForm";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AddReview() {
  const { songId } = useParams();
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t("Add Review")}</h2>
      <ReviewForm songId={songId} />
    </div>
  );
}
