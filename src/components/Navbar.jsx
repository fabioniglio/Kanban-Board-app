import "./Navbar.css";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="App Logo" className="app-logo" />
      <h3>Trello</h3>
    </div>
  );
};

export default Navbar;
