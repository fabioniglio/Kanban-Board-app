import kanbanData from "../assets/data/kanban.json";
import classes from "../styles/ContentPage.module.css";
import Section from "../components/Section";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ContentPage = () => {
  const taskType = ["To Do", "In Progress", "Done"];
  const [kanbanDataList, setKanbanDataList] = useState(kanbanData);
  const handleKanbanDataList = (operation, data) => {
    switch (operation) {
      case "add": {
        setKanbanDataList((prevList) => [...prevList, data]);
        break;
      }
      case "edit": {
        setKanbanDataList(
          kanbanDataList.map((currentData) => {
            if (currentData.id === data.id) {
              return { ...currentData, ...data };
            }
            return currentData;
          })
        );
        break;
      }
      case "delete": {
        setKanbanDataList((prevList) =>
          prevList.filter((currentData) => {
            return currentData.id != data.id;
          })
        );
        break;
      }
      default:
        break;
    }
  };
  return (
    <div className={classes.container}>
      {taskType.map((type) => {
        return (
          <Section
            key={uuidv4()}
            status={type}
            kanbanDataList={kanbanDataList}
            handleKanbanDataList={handleKanbanDataList}
          />
        );
      })}
    </div>
  );
};

export default ContentPage;
