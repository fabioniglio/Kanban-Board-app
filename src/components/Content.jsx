import "./Content.css";
import Section from "./Section";
import kanbanData from "../assets/data/kanban.json";

const Content = () => {
  return (
    <div className="content">
      <Section status="To Do" kanbanDataList={kanbanData} />
      <Section status="In Progress" kanbanDataList={kanbanData} />
      <Section status="Done" kanbanDataList={kanbanData} />
    </div>
  );
};

export default Content;
