import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import UserPage from "./pages/UserPage";
import AuthTokenProvider from "./components/AuthTokenProvider";

function App() {
  return (
    <AuthTokenProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/profile" element={<UserPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthTokenProvider>
  );
}

export default App;
