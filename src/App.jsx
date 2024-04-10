import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ContentPage from "./Pages/ContentPage";
import Footer from "./components/Footer";
import AboutPage from "./Pages/AboutPage";
import ErrorPage from "./Pages/ErrorPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <Routes>
          <Route path="/" element={<ContentPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
