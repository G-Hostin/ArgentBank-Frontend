import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/userSlice";
import { fetchProfile } from "../redux/userThunk";

export default function AuthTokenProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      dispatch(setToken(token));
      dispatch(fetchProfile(token));
    }
  }, [dispatch]);

  return children;
}
