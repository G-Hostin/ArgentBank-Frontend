import AccountCard from "../components/AccountCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditUsernameForm from "../components/EditUsernameForm";

export default function UserPage() {
  const token = useSelector((state) => state.user.token);
  const profile = useSelector((state) => state.user.profile);
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false); // state local pour l'affichage du editform

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
        {!editing ? (
          <>
            <h1>
              Welcome back
              <br />
              {profile.userName}
            </h1>
            <button className="edit-button" onClick={() => setEditing(true)}>
              Edit Name
            </button>
          </>
        ) : (
          <>
            <h1>Edit User Info</h1>
            <EditUsernameForm onCancel={() => setEditing(false)} />
          </>
        )}
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
