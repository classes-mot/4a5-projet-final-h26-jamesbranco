import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [songs, setSongs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  // GET songs
  const fetchSongs = async () => {
    const res = await fetch("http://localhost:5000/api/songs");
    const data = await res.json();
    setSongs(data);
  };

  // ⭐ GET reviews (AJOUT)
  const fetchReviews = async () => {
    const res = await fetch("http://localhost:5000/api/reviews");
    const data = await res.json();
    setReviews(data);
  };

  useEffect(() => {
    fetchSongs();
    fetchReviews();
  }, []);

  // DELETE song
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

  // reviews par song
  const getSongReviews = (songId) => {
    return reviews.filter((r) => r.song?._id === songId || r.song === songId);
  };

  return (
    <div>
      <h2>All Songs 🎧</h2>

      {songs.length === 0 ? (
        <p>No songs found</p>
      ) : (
        songs.map((song) => {
          const songReviews = getSongReviews(song._id);

          return (
            <div key={song._id} style={cardStyle}>
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
              <p>{song.genre}</p>

              <div style={{ marginTop: "10px" }}>
                <h4>Reviews ({songReviews.length})</h4>

                {songReviews.length === 0 ? (
                  <p>No reviews yet</p>
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
                  Add Review
                </button>

                <button
                  onClick={() => deleteSong(song._id)}
                  style={{ background: "red", color: "white" }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

// style inchangé
const cardStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
};
