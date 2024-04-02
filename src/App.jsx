import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <Content />
      </div>
      <Footer />
    </div>
  );
}

export default App;
