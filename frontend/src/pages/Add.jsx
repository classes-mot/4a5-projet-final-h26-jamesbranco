import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Add() {
    const navigate = useNavigate();

    async function addMusicSubmitHandler(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    const newMusic = {
        title: data.title,
        artist: data.artist,
        genre: data.genre,
        description: data.description,
    };

    try {
        await API.post("/music", newMusic);

        navigate("/music");
    } catch (error) {
        console.log("Erreur ajout musique :", error);
    }
 }
  return (
    <form onSubmit={addMusicSubmitHandler}>
      <h2>Ajouter une musique</h2>

      <div className="control">
        <label htmlFor="title">Titre</label>
        <input id="title" type="text" name="title" required />
      </div>

      <div className="control">
        <label htmlFor="artist">Artiste</label>
        <input id="artist" type="text" name="artist" required />
      </div>

      <div className="control">
        <label htmlFor="genre">Genre</label>
        <select id="genre" name="genre">
          <option value="">Choisir</option>
          <option value="Pop">Pop</option>
          <option value="Classic">Classic</option>
          <option value="Rock">Rock</option>
          <option value="Jazz">Jazz</option>
        </select>
      </div>

      <div className="control">
        <label htmlFor="releaseDate">Date de sortie</label>
        <input id="releaseDate" type="date" name="releaseDate" />
      </div>

      <div className="control">
        <label htmlFor="coverUrl">Image (URL)</label>
        <input id="coverUrl" type="text" name="coverUrl" />
      </div>

      <div className="control">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="4" />
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Ajouter
        </button>
      </p>
    </form>
  );
}