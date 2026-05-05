// pages/EditMusic.js
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

export default function EditMusic() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    artist: "",
    genre: "",
    description: "",
  });

  // 📥 charger la musique
  useEffect(() => {
    async function fetchMusic() {
      try {
        const res = await API.get(`/music/${id}`);
        const data = res.data;

        setForm({
          title: data.title || "",
          artist: data.artist || "",
          genre: data.genre || "",
          description: data.description || "",
        });
      } catch (err) {
        console.error(err);
        alert("Erreur chargement musique");
      }
    }

    fetchMusic();
  }, [id]);

  // ✏️ gestion input
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
      alert("Titre et artiste obligatoires");
      return;
    }

    try {
      await API.put(`/music/${id}`, form);

      alert("Musique modifiée !");
      navigate("/music");
    } catch (err) {
      console.error(err);
      alert("Erreur modification");
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <h2>Modifier une musique</h2>

      <div className="control">
        <label>Titre</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={changeHandler}
        />
      </div>

      <div className="control">
        <label>Artiste</label>
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
          <option value="">Choisir</option>
          <option value="Pop">Pop</option>
          <option value="Classic">Classic</option>
          <option value="Rock">Rock</option>
          <option value="Jazz">Jazz</option>
        </select>
      </div>

      <div className="control">
        <label>Date de sortie</label>
        <input
          type="date"
          name="releaseDate"
          value={form.releaseDate}
          onChange={changeHandler}
        />
      </div>

      <div className="control">
        <label>Image (URL)</label>
        <input
          type="text"
          name="coverUrl"
          value={form.coverUrl}
          onChange={changeHandler}
        />
      </div>

      <div className="control">
        <label>Description</label>
        <textarea
          name="description"
          rows="4"
          value={form.description}
          onChange={changeHandler}
        />
      </div>

      <button type="submit">Modifier</button>
    </form>
  );
}
