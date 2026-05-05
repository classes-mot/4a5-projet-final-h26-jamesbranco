import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReviewList from "../components/ReviewList/ReviewList";

export default function ReviewPage() {
  const { id } = useParams();

  const [song, setSong] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // 📥 GET song details
  useEffect(() => {
    async function fetchSong() {
      try {
        const res = await fetch(`http://localhost:5000/api/songs/${id}`);

        if (!res.ok) {
          throw new Error("Failed to load song");
        }

        const data = await res.json();

        setSong(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Error loading song");
        setLoading(false);
      }
    }

    fetchSong();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="review-page">
      {/* NAVIGATION */}
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "10px" }}>
          Home
        </Link>

        <Link to="/my-reviews">My Reviews</Link>
      </nav>

      {/* SONG DETAILS */}
      <div className="song-details">
        <h2>{song.title}</h2>
        <p>
          <strong>Artist:</strong> {song.artist}
        </p>
        <p>
          <strong>Genre:</strong> {song.genre}
        </p>
      </div>

      <hr />

      {/* REVIEWS */}
      <h3>Reviews</h3>

      <ReviewList songId={id} />
    </div>
  );
}
