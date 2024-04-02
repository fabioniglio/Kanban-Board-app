import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import About from "./components/About";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <About />
      </div>
      <Footer />
    </div>
  );
}

export default App;
