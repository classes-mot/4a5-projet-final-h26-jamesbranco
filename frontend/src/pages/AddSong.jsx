import { useNavigate } from "react-router-dom";

export default function AddSong() {
  const navigate = useNavigate();

  async function addSongSubmitHandler(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    const newSong = {
      title: data.title,
      artist: data.artist,
      genre: data.genre,
    };

    try {
      await fetch("http://localhost:5000/api/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSong),
      });

      navigate("/");
    } catch (error) {
      console.log("Error adding song:", error);
    }
  }

  return (
    <form onSubmit={addSongSubmitHandler}>
      <h2>Add Song</h2>

      <div className="control">
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required />
      </div>

      <div className="control">
        <label htmlFor="artist">Artist</label>
        <input id="artist" type="text" name="artist" required />
      </div>

      <div className="control">
        <label htmlFor="genre">Genre</label>
        <select id="genre" name="genre" required>
          <option value="">Choose</option>
          <option value="Pop">Pop</option>
          <option value="Rock">Rock</option>
          <option value="Jazz">Jazz</option>
          <option value="Classic">Classic</option>
        </select>
      </div>

      <p className="form-actions">
        <button type="reset">Reset</button>
        <button type="submit">Add Song</button>
      </p>
    </form>
  );
}
