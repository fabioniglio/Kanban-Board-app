import { useState } from "react";
import classes from "../styles/Sidebar.module.css";
import Tab from "./Tab";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("Board");

  const handleActiveTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className={classes.container}>
      <NavLink
        to="/"
        onClick={() => handleActiveTab("Board")}
        className={classes.navLink}
      >
        <Tab tabName="Board" isActive={activeTab === "Board"} />
      </NavLink>
      <NavLink
        to="/about"
        onClick={() => handleActiveTab("About")}
        className={classes.navLink}
      >
        <Tab tabName="About" isActive={activeTab === "About"} />
      </NavLink>
    </div>
  );
};

export default Sidebar;
