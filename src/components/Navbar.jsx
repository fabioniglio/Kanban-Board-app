import classes from "../styles/Navbar.module.css";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  return (
    <div className={classes.container}>
      <img src={logo} alt="App Logo" className={classes.appLogo} />
      <h3 className={classes.appName}>Kanban</h3>
    </div>
  );
};

export default Navbar;
