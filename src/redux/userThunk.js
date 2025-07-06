import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  // action asynchrone RTK pour le pending, fullfiled, rejeted automatiquement compris par Redux
  "user/loginuser", // nom de l'action
  async ({ email, password }, thunkAPI) => {
    // fonction async qui prend en parametre les infos du form et thunkAPI (objet Redux pour la gestion des erreurs)
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }); // POST API avec les parametres email, password dans le body
    const data = await response.json();
    if (!response.ok) {
      return thunkAPI.rejectWithValue(data.message);
    } // Si response pas ok alors on retourne l'erreur data.message à Redux (pour qu'il sache le rejected)

    // Si le login réussi alors on tente de recuperer les infos de l'user
    const profileInfoResponse = await fetch(
      "http://localhost:3001/api/v1/user/profile",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.body.token}`,
        }, // token qu'on vient d'obtenir dans le login pour l'auth des infos
      }
    );
    const profileInfoData = await profileInfoResponse.json();
    if (!profileInfoResponse.ok) {
      return thunkAPI.rejectWithValue(profileInfoData.message);
    }

    return { token: data.body.token, profile: profileInfoData.body }; // retourne le payload --> token et les infos profile (utilisé par reducer pour màj le state) = fulfilled
  }
);
