import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import { useTranslation } from "react-i18next";
import "./LoginForm.css";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailVide, setEmailVide] = useState(false);
  const [passVide, setPassVide] = useState(false);

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    const emailEmpty = email.trim() === "";
    const passwordEmpty = password.trim() === "";

    setEmailVide(emailEmpty);
    setPassVide(passwordEmpty);

    if (emailEmpty || passwordEmpty) return;

    try {
      const res = await fetch("http://localhost:5000/api/users/connexion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      console.log("LOGIN RESPONSE =", data);

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);

      login();
      navigate("/");
    } catch (err) {
      console.log("LOGIN ERROR:", err);
    }
  };

  return (
    <form onSubmit={authSubmitHandler} className="login-form">
      <h2>{t("login.title")}</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">{t("login.email")}</label>
          <input
            id="email"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailVide && <div className="error">{t("login.required")}</div>}
        </div>

        <div className="control no-margin">
          <label htmlFor="password">{t("login.password")}</label>
          <input
            id="password"
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {passVide && <div className="error">{t("login.required")}</div>}
        </div>
      </div>

      <p className="form-actions">
        <button className="button">{t("buttons.login")}</button>
      </p>

      <p style={{ marginTop: "1rem" }}>
        {t("login.noAccount")}{" "}
        <Link to="/register">{t("login.createAccount")}</Link>
      </p>
    </form>
  );
}
