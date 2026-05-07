import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function RegisterForm() {
  const { t } = useTranslation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError(t("register.required"));
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users/inscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("Registration failed");
      }

      navigate("/login");
    } catch (err) {
      console.log("Error register", err);
      setError(t("register.error"));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder={t("register.username")}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        placeholder={t("register.email")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder={t("register.password")}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">{t("register.button")}</button>
    </form>
  );
}

export default RegisterForm;
