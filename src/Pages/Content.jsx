import classes from "../styles/Content.module.css";
import Section from "../components/Section";
import kanbanData from "../assets/data/kanban.json";

const Content = () => {
  return (
    <div className={classes.container}>
      <Section status="To Do" kanbanDataList={kanbanData} />
      <Section status="In Progress" kanbanDataList={kanbanData} />
      <Section status="Done" kanbanDataList={kanbanData} />
    </div>
  );
};

export default Content;
