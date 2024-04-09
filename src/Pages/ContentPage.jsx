import kanbanData from "../assets/data/kanban.json";
import { DragDropContext } from "react-beautiful-dnd";
import classes from "../styles/ContentPage.module.css";
import Section from "../components/Section";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

const ContentPage = () => {
  const taskType = ["To Do", "In Progress", "Done"];

  const [kanbanDataList, setKanbanDataList] = useState(kanbanData);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {}, [kanbanDataList]);

  const handleDragEnd = (result) => {
    console.log(result);
    const { draggableId, source, destination } = result;

    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    const newList = Array.from(kanbanDataList);
    const draggedTaskIndex = newList.findIndex(
      (task) => task.id === draggableId
    );
    const draggedTask = newList[draggedTaskIndex];

    if (!draggedTask) return;

    draggedTask.status = taskType[parseInt(destination.droppableId)];

    newList.splice(draggedTaskIndex, 1);

    const tasksInNewStatus = newList.filter(
      (task) => task.status === draggedTask.status
    );

    let newIndexInFiltered = destination.index;

    if (newIndexInFiltered > tasksInNewStatus.length) {
      newIndexInFiltered = tasksInNewStatus.length;
    }

    let newIndexInFullList = newList.findIndex((task, index) => {
      if (task.status !== draggedTask.status) return false;
      if (newIndexInFiltered === 0) return true;
      const prevTask = newList[index - 1];
      return (
        prevTask &&
        prevTask.status === draggedTask.status &&
        --newIndexInFiltered === 0
      );
    });

    if (newIndexInFullList === -1) {
      newIndexInFullList = newList.length;
    }

    newList.splice(newIndexInFullList, 0, draggedTask);

    setKanbanDataList(newList);

    setToastMessage("saved");
    setTimeout(() => {
      setToastMessage("");
    }, 1000);
  };

  const handleKanbanDataList = (operation, data) => {
    switch (operation) {
      case "add": {
        const copy = JSON.parse(JSON.stringify(kanbanDataList));
        copy.push(data);
        setKanbanDataList(copy);
        setToastMessage("saved");
        setTimeout(() => {
          setToastMessage("");
        }, 1000);
        console.log(data);
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
        setToastMessage("updated");
        setTimeout(() => {
          setToastMessage("");
        }, 1000);
        break;
      }
      case "delete": {
        const copy = JSON.parse(JSON.stringify(kanbanDataList));

        setKanbanDataList(
          copy.filter((currentData) => {
            return currentData.id != data.id;
          })
        );
        setToastMessage("deleted");
        setTimeout(() => {
          setToastMessage("");
        }, 1000);
        break;
      }
      default:
        break;
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={classes.container}>
        {taskType.map((type, index) => {
          let indexString = index.toString();
          let kanbanDataForSection = [];
          let key = uuidv4();
          if (type === "To Do")
            kanbanDataForSection = kanbanDataList.filter(
              (task) => task.status === "To Do"
            );
          else if (type === "In Progress")
            kanbanDataForSection = kanbanDataList.filter(
              (task) => task.status === "In Progress"
            );
          else if (type === "Done")
            kanbanDataForSection = kanbanDataList.filter(
              (task) => task.status === "Done"
            );
          return (
            <Section
              key={key}
              id={indexString}
              status={type}
              kanbanDataList={kanbanDataForSection}
              handleKanbanDataList={handleKanbanDataList}
            />
          );
        })}
      </div>
      {toastMessage && (
        <span
          className={classes.toast}
        >{`Data ${toastMessage} successfully`}</span>
      )}
    </DragDropContext>
  );
};

export default ContentPage;
