import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LoginRegister from "./pages/LoginRegister";
import MatPage from "./pages/MatPage";
import Profil from "./pages/Profil";
import IngPage from "./pages/IngPage";
import SosPage from "./pages/SosPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />{" "}
        <Route path="/login" element={<LoginPage />} />{" "}
        <Route path="/register" element={<RegisterPage />} />{" "}
        <Route path="/mat" element={<MatPage />} />{" "}
        <Route path="/profil" element={<Profil />} />{" "}
        <Route path="/sos" element={<SosPage />} />{" "}
        <Route path="/ing" element={<IngPage />} />{" "}
      </Routes>{" "}
    </Router>
  );
}

export default App;
