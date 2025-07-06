import AccountCard from "../components/AccountCard";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function UserPage() {
  const token = useSelector((state) => state.user.token);
  const profile = useSelector((state) => state.user.profile);
  const navigate = useNavigate();

  useEffect(() => {
    // si pas de token --> redirection auto
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  if (!profile) {
    return <div>Chargement...</div>;
  } // verif profile pour eviter les erreurs

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {profile.userName}
          {/* {profile.firstName} {profile.lastName} */}
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <AccountCard
        title="Argent Bank Checking (x8349)"
        amount="$2,082.79"
        desc="Available Balance"
      />
      <AccountCard
        title="Argent Bank Savings (x6712)"
        amount="$10,928.42"
        desc="Available Balance"
      />
      <AccountCard
        title="Argent Bank Credit Card (x8349)"
        amount="$184.30"
        desc="Current Balance"
      />
    </main>
  );
}
