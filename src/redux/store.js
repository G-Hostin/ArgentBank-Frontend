import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

export const store = configureStore({
  // création du store general Redux
  reducer: {
    // Definis les slices du store
    user: userReducer, // Branche le userSlice a state.user
  },
});
