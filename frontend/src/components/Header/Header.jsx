import { useAuth } from "../AuthContext/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Header.css";

export default function Header() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="main-header">
      <h1 className="title">{t("header.title")}</h1>

      {/* Message principal */}
      <p className="subtitle">{t("header.subtitle")}</p>

      <nav className="nav-links">
        <Link to="/">{t("nav.home")}</Link>

        {isLoggedIn && <Link to="/songs/add">{t("nav.addSong")}</Link>}
        {isLoggedIn && <Link to="/my-reviews">{t("nav.reviews")}</Link>}

        {/* Login / Logout */}
        {isLoggedIn ? (
          <button onClick={handleLogout} className="logout-btn">
            {t("nav.logout")}
          </button>
        ) : (
          <Link to="/login">{t("nav.login")}</Link>
        )}
      </nav>
    </header>
  );
}
