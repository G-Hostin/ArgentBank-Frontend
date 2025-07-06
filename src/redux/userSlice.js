import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./userThunk";

const initialState = {
  token: null, // token authentification
  profile: null, // infos du profil user
  isLoading: false, // gestion du pending
  error: null, // gestion des erreurs
};

const userSlice = createSlice({
  // Slice = partie du store Redux qui contient : son name, son initialState (defini plus haut), ses actions synchrones (reducers) et ses reactions aux actions async (extraReducers)
  name: "user", // nom du slice utilisé dans le store pour identifier cette partie
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.profile = null;
      state.isLoading = false;
      state.error = null;
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");
    }, // lorsquon appelle dispatch(logout()) ça remet tout le state à 0 pour le déco
  },
  extraReducers: (builder) => {
    // reactions aux actions async (comme loginUser)
    builder // permet d'ajouter pending, fulfilled, rejected
      .addCase(loginUser.pending, (state) => {
        // lorsque le login commence --> chargement donc isLoading + remise à zero (si il y en avait une) des erreurs
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // lorsque le login est reussi --> stop chargement + stocke le token et les infos profile dans le state + vidage erreur
        state.isLoading = false;
        state.token = action.payload.token;
        state.profile = action.payload.profile;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        // lorsque le login echoue --> stop chargement + stocke le msg d'erreur dans le state (pour l'afficher)
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions; // export pour pouvoir utiliser logout partout comme action
export default userSlice.reducer; // export du reducer pour qu'il soit branché dans le store
