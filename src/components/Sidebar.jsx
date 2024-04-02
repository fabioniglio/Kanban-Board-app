import "./Sidebar.css";
import Tab from "./Tab";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <Tab tabName="Board" />
      <Tab tabName="About" />
    </div>
  );
};

export default Sidebar;
