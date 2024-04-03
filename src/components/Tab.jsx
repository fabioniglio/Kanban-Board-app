import classes from "../styles/Tab.module.css";

const Tab = ({ tabName }) => {
  return <div className={classes.container}>{tabName}</div>;
};

export default Tab;
