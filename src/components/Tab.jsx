import classes from "../styles/Tab.module.css";

const Tab = ({ tabName, isActive }) => {
  return (
    <div className={`${classes.container} ${isActive ? classes.active : ""}`}>
      {tabName}
    </div>
  );
};

export default Tab;
