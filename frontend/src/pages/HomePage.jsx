import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const [songs, setSongs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const fetchSongs = async () => {
    const res = await fetch("http://localhost:5000/api/songs");
    const data = await res.json();
    setSongs(data);
  };

  const fetchReviews = async () => {
    const res = await fetch("http://localhost:5000/api/reviews");
    const data = await res.json();
    setReviews(data);
  };

  useEffect(() => {
    fetchSongs();
    fetchReviews();
  }, []);

  const deleteSong = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/songs/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setSongs((prev) => prev.filter((song) => song._id !== id));
    } catch (error) {
      console.log("Error deleting song:", error);
    }
  };

  const getSongReviews = (songId) => {
    return reviews.filter((r) => r.song?._id === songId || r.song === songId);
  };

  return (
    <div>
      <LanguageSwitcher />

      <h2>{t("home.title")}</h2>

      {songs.length === 0 ? (
        <p>{t("home.noSongs")}</p>
      ) : (
        songs.map((song) => {
          const songReviews = getSongReviews(song._id);

          return (
            <div key={song._id} style={cardStyle}>
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
              <p>{song.genre}</p>

              <div style={{ marginTop: "10px" }}>
                <h4>
                  {t("home.reviews")} ({songReviews.length})
                </h4>

                {songReviews.length === 0 ? (
                  <p>{t("home.noReviews")}</p>
                ) : (
                  songReviews.map((review) => (
                    <div
                      key={review._id}
                      style={{ padding: "5px", borderTop: "1px solid #ddd" }}
                    >
                      <p>
                        <strong>{review.title}</strong>
                      </p>
                      <p>⭐ {review.rating}/5</p>
                      <p>{review.comment}</p>
                    </div>
                  ))
                )}
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button onClick={() => navigate(`/reviews/add/${song._id}`)}>
                  {t("buttons.addReview")}
                </button>

                <button
                  onClick={() => deleteSong(song._id)}
                  style={{ background: "red", color: "white" }}
                >
                  {t("buttons.delete")}
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
};
