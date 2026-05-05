import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditSongPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    artist: "",
    genre: "",
  });

  const [error, setError] = useState("");

  // 📥 GET song
  useEffect(() => {
    async function fetchSong() {
      try {
        const res = await fetch(`http://localhost:5000/api/songs/${id}`);

        if (!res.ok) {
          throw new Error("Failed to load song");
        }

        const data = await res.json();

        setForm({
          title: data.title || "",
          artist: data.artist || "",
          genre: data.genre || "",
        });
      } catch (err) {
        console.log(err);
        setError("Error loading song");
      }
    }

    fetchSong();
  }, [id]);

  // ✏️ input change
  function changeHandler(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  // 🚀 submit
  async function submitHandler(e) {
    e.preventDefault();

    if (!form.title || !form.artist) {
      setError("Title and artist are required");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/songs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to update song");
      }

      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Error updating song");
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <h2>Edit Song</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="control">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={changeHandler}
        />
      </div>

      <div className="control">
        <label>Artist</label>
        <input
          type="text"
          name="artist"
          value={form.artist}
          onChange={changeHandler}
        />
      </div>

      <div className="control">
        <label>Genre</label>
        <select name="genre" value={form.genre} onChange={changeHandler}>
          <option value="">Choose</option>
          <option value="Pop">Pop</option>
          <option value="Rock">Rock</option>
          <option value="Jazz">Jazz</option>
          <option value="Classic">Classic</option>
        </select>
      </div>

      <button type="submit">Update Song</button>
    </form>
  );
}
