import { useAuth } from "../AuthContext/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="main-header">
      <h1 className="title">Music Review</h1>

      {/* Message principal */}
      <p className="subtitle">Discover and review music !</p>

      <nav className="nav-links">
        <Link to="/">Home</Link>

        {isLoggedIn && <Link to="/songs/add">Add Song</Link>}
        {isLoggedIn && <Link to="/my-reviews">Reviews</Link>}

        {/* Login / Logout */}
        {isLoggedIn ? (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}
