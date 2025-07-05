import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
// import SignInPage from "./pages/SignInPage"; // à créer plus tard

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/signin" element={<SignInPage />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
