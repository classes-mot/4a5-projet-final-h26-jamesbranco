import { useState } from "react";
import "./MusicForm.css";

function MusicForm({ onSave, songToEdit }) {
  const [title, setTitle] = useState(songToEdit?.title || "");
  const [artist, setArtist] = useState(songToEdit?.artist || "");
  const [genre, setGenre] = useState(songToEdit?.genre || "");
  const [errors, setErrors] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !artist || !genre) {
      setErrors("All fields are required");
      return;
    }

    const newSong = {
      title,
      artist,
      genre,
    };

    try {
      let res;

      if (songToEdit) {
        // UPDATE
        res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/songs/${songToEdit._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newSong),
          },
        );
      } else {
        // CREATE
        res = await fetch(`${import.meta.env.VITE_API_URL}/api/songs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSong),
        });
      }

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();

      if (onSave) onSave(data);

      // reset form si ajout
      if (!songToEdit) {
        setTitle("");
        setArtist("");
        setGenre("");
      }
    } catch (err) {
      console.log(err);
      setErrors("Error while saving song");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="music-form"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "300px",
      }}
    >
      <h3>{songToEdit ? "Edit Song" : "Add Song"}</h3>

      {errors && <p style={{ color: "red" }}>{errors}</p>}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />

      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />

      <button type="submit">{songToEdit ? "Update" : "Save"}</button>
    </form>
  );
}

export default MusicForm;
