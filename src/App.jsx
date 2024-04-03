import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Content from "./Pages/Content";
import Footer from "./components/Footer";
import About from "./Pages/About";

function App() {
  return (
    <div>
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <Content />
        {/* <About /> */}
      </div>
      <Footer />
    </div>
  );
}

export default App;
