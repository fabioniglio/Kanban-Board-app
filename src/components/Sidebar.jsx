import classes from "../styles/Sidebar.module.css";
import Tab from "./Tab";

const Sidebar = () => {
  return (
    <div className={classes.container}>
      <Tab tabName="Board" />
      <Tab tabName="About" />
    </div>
  );
};

export default Sidebar;
