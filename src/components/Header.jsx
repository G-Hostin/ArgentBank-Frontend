import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/argentBankLogo.webp";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

export default function Header() {
  const token = useSelector((state) => state.user.token);
  const profile = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {!token ? (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        ) : (
          <>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i>
              {profile ? profile.userName : ""}
            </Link>
            <button
              className="main-nav-item"
              style={{ background: "none", border: "none", cursor: "pointer" }}
              onClick={handleLogout}
            >
              <i className="fa fa-sign-out"></i>Sign Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
