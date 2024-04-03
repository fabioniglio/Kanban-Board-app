import classes from "../styles/Sidebar.module.css";
import Tab from "./Tab";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className={classes.container}>
      <NavLink to="/">
        <Tab tabName="Board" />
      </NavLink>
      <NavLink to="/about">
        <Tab tabName="About" />
      </NavLink>
    </div>
  );
};

export default Sidebar;
