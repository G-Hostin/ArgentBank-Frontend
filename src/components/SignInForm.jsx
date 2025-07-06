import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/userThunk";

export default function SignInForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // state local pour les inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // state Redux pour loading et error
  const error = useSelector((state) => state.user.error);
  const isLoading = useSelector((state) => state.user.isLoading);

  // fonction submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/profile");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div className="input-remember">
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <button type="submit" className="sign-in-button" disabled={isLoading}>
        {isLoading ? "Loading..." : "Sign In"}
      </button>
      {error && <div style={{ color: "red", marginTop: "1rem" }}>{error}</div>}
      {/* affiche l'erreur si il y en a une */}
    </form>
  );
}
