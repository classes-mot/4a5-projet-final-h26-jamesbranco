import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailVide, setEmailVide] = useState(false);
  const [passVide, setPassVide] = useState(false);

  const authSubmitHandler = (event) => {
    event.preventDefault();

    const emailVide = email.trim() === "";
    const passwordVide = password.trim() === "";

    setEmailVide(emailVide);
    setPassVide(passwordVide);

    if (emailVide || passwordVide) return;

    login();

    // navigate("");
  };

  return (
    <form onSubmit={authSubmitHandler}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailVide && <div className="error">Champ obligatoire</div>}
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {passVide && <div className="error">Champ obligatoire</div>}
        </div>
      </div>

      <p className="form-actions">
        <button className="button">Se connecter</button>
      </p>
    </form>
  );
}
