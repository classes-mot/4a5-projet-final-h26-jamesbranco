import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MusicCard from "../MusicCard/MusicCard";
import { useAuth } from "../AuthContext/AuthContext";

const MusicList = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  // 📥 GET songs
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/songs");

        if (!res.ok) {
          throw new Error("Failed to load songs");
        }

        const data = await res.json();

        setSongs(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Error loading songs");
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  // ❌ DELETE song
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/songs/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      setSongs((prev) => prev.filter((song) => song._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <p>Loading songs...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="music-list">
      <h2>🎧 Songs</h2>

      {isLoggedIn && (
        <button onClick={() => navigate("/songs/add")}>Add Song</button>
      )}

      {songs.length === 0 ? (
        <p>No songs found</p>
      ) : (
        songs.map((song) => (
          <MusicCard key={song._id} song={song} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
};

export default MusicList;
