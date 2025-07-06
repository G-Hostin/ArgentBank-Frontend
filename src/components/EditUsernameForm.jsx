import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUsername } from "../redux/userThunk";

export default function EditUsernameForm({ onCancel }) {
  // onCancel pour fermer le form en prop
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const token = useSelector((state) => state.user.token);

  const [newUsername, setNewUsername] = useState(
    profile ? profile.userName : ""
  ); // state local du username a modif, verif qu'il y en a un --> initialisé avec celui trouvé dans le state global Redux
  const [error, setError] = useState(null); // state local gestion erreurs

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newUsername.trim()) {
      // verif que le champ username est pas vide ou que des espaces --> envoi une erreur
      setError("Username cannot be empty");
      return;
    }
    // envoi action editUsername avec le token et le nouvel username
    dispatch(editUsername({ token, userName: newUsername }))
      .unwrap() // gere les succes/echec comme promesse JS
      .then(() => {
        onCancel(); // Si ok --> onCancel --> ferme le form
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="edit-username-form">
      <div className="input-row">
        <label htmlFor="username">User name</label>
        <input
          type="text"
          id="username"
          value={newUsername}
          onChange={(e) => {
            setNewUsername(e.target.value);
            setError(null);
          }}
          autoFocus
        />
        {/*onChange met a jour le state et efface l'erreur si il y en avait une, autoFocus focus direct curseur*/}
      </div>
      <div className="input-row">
        <label htmlFor="firstname">First name</label>
        <input type="text" id="firstname" value={profile.firstName} disabled />
      </div>
      <div className="input-row">
        <label htmlFor="lastname">Last name</label>
        <input type="text" id="lastname" value={profile.lastName} disabled />
      </div>
      <div className="form-btn-row">
        <button type="submit" className="edit-button">
          Save
        </button>
        <button type="button" className="edit-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
      {error && <span className="error-msg">{error}</span>}
    </form>
  );
}
