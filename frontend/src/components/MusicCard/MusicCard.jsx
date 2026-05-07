import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import "./MusicCard.css";

function MusicCard({ song, onDelete }) {
  const { isLoggedIn } = useAuth();

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this song ?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/songs/${song._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      if (onDelete) onDelete(song._id);
    } catch (err) {
      console.log("Error deleting song", err);
    }
  };

  return (
    <div className="music-card">
      {/* Infos chanson */}
      <h3>{song.title}</h3>
      <p>
        <strong>Artist:</strong> {song.artist}
      </p>
      <p>
        <strong>Genre:</strong> {song.genre}
      </p>

      {/* Actions */}
      <div className="music-actions">
        {/* Reviews */}
        <Link to={`/songs/${song._id}`} className="btn">
          View Reviews
        </Link>

        {/* Only logged in */}
        {isLoggedIn && (
          <>
            <Link to={`/songs/edit/${song._id}`} className="btn edit">
              Edit
            </Link>

            <button onClick={handleDelete} className="btn delete">
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default MusicCard;
