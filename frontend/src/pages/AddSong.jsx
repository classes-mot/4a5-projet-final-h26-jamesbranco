import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AddSong() {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/songs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSong),
      });

      const data = await res.json();

      console.log("POST RESPONSE:", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to add song");
      }

      navigate("/");
    } catch (error) {
      console.log("Error adding song:", error);
    }
  }

  return (
    <form onSubmit={addSongSubmitHandler}>
      <h2>{t("addSong.title")}</h2>

      <div className="control">
        <label htmlFor="title">{t("addSong.titleLabel")}</label>
        <input id="title" type="text" name="title" required />
      </div>

      <div className="control">
        <label htmlFor="artist">{t("addSong.artist")}</label>
        <input id="artist" type="text" name="artist" required />
      </div>

      <div className="control">
        <label htmlFor="genre">{t("addSong.genre")}</label>
        <select id="genre" name="genre" required>
          <option value="">{t("addSong.choose")}</option>
          <option value="Pop">Pop</option>
          <option value="Rock">Rock</option>
          <option value="Jazz">Jazz</option>
          <option value="Classic">Classic</option>
        </select>
      </div>

      <p className="form-actions">
        <button type="reset">{t("buttons.reset")}</button>
        <button type="submit">{t("buttons.addSong")}</button>
      </p>
    </form>
  );
}
