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

  useEffect(() => {}, [kanbanDataList]);

  const handleDragEnd = (result) => {
    const { draggableId, source, destination } = result;

    // Exit if there's no destination or the item is dropped back into its original position
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

    // Ensure the dragged task is found
    if (!draggedTask) return;

    // Update the task's status based on the new section it's dropped into
    draggedTask.status = taskType[parseInt(destination.droppableId)];

    // Remove the task from its original position
    newList.splice(draggedTaskIndex, 1);

    // Calculate the new insertion index within the new status
    // First, filter tasks by the new status to only work with relevant subset
    const tasksInNewStatus = newList.filter(
      (task) => task.status === draggedTask.status
    );

    // Find the index of the task in the new status where the dragged task should be inserted
    let newIndexInFiltered = destination.index;

    // If dropping beyond the last item, adjust the index to the end of the filtered list
    if (newIndexInFiltered > tasksInNewStatus.length) {
      newIndexInFiltered = tasksInNewStatus.length;
    }

    // Convert the index in the filtered list back to an index in the full list
    let newIndexInFullList = newList.findIndex((task, index) => {
      if (task.status !== draggedTask.status) return false; // Skip tasks of other statuses
      if (newIndexInFiltered === 0) return true; // If we're inserting at the start
      const prevTask = newList[index - 1];
      return (
        prevTask &&
        prevTask.status === draggedTask.status &&
        --newIndexInFiltered === 0
      );
    });

    // If not found, or inserting at the end, adjust the index accordingly
    if (newIndexInFullList === -1) {
      newIndexInFullList = newList.length; // Insert at end if specific index not found or inserting after the last task of the same status
    }

    // Insert the dragged task at the calculated position
    newList.splice(newIndexInFullList, 0, draggedTask);

    // Update the state with the modified list
    setKanbanDataList(newList);
  };

  const handleKanbanDataList = (operation, data) => {
    switch (operation) {
      case "add": {
        const copy = JSON.parse(JSON.stringify(kanbanDataList));
        copy.push(data);
        setKanbanDataList(/* (prevList) => [...prevList, data] */ copy);
        //updateTaskInState(data);
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
        console.log(data);
        //updateTaskInState(data);

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
    </DragDropContext>
  );
};

export default ContentPage;
