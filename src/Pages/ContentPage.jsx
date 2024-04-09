import kanbanData from "../assets/data/kanban.json";
import { DragDropContext } from "react-beautiful-dnd";
import classes from "../styles/ContentPage.module.css";
import Section from "../components/Section";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

const ContentPage = () => {
  const taskType = ["To Do", "In Progress", "Done"];

  const [toDo, setToDo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);

  const [kanbanDataList, setKanbanDataList] = useState(kanbanData);

  useEffect(() => {
    const toDoTasks = kanbanData.filter((task) => task.status === "To Do");
    const inProgressTasks = kanbanData.filter(
      (task) => task.status === "In Progress"
    );
    const doneTasks = kanbanData.filter((task) => task.status === "Done");

    setToDo(toDoTasks);
    setInProgress(inProgressTasks);
    setDone(doneTasks);
  }, [kanbanData]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    console.log(result);
    // Do nothing if dropped outside the list or if there's no destination
    if (!destination) return;

    const sourceId = parseInt(source.droppableId);
    const destinationId = parseInt(destination.droppableId);

    // Deep copy the original lists to avoid directly mutating the state
    const start =
      sourceId === 0 ? [...toDo] : sourceId === 1 ? [...inProgress] : [...done];
    const finish =
      destinationId === 0
        ? [...toDo]
        : destinationId === 1
        ? [...inProgress]
        : [...done];

    // Remove the task from its original position
    const [removed] = start.splice(source.index, 1);

    // If the source and destination columns are the same, re-insert the task at the new position
    // Otherwise, insert the task into the new column's position
    if (source.droppableId === destination.droppableId) {
      start.splice(destination.index, 0, removed);
    } else {
      removed.status = taskType[destinationId]; // Update status based on destination
      finish.splice(destination.index, 0, removed);
    }

    // Update the state based on the source and destination IDs
    if (sourceId === 0) setToDo(start);
    else if (sourceId === 1) setInProgress(start);
    else if (sourceId === 2) setDone(start);

    if (sourceId !== destinationId) {
      if (destinationId === 0) setToDo(finish);
      else if (destinationId === 1) setInProgress(finish);
      else if (destinationId === 2) setDone(finish);
    }
    console.log(done);
    // Delete from previous state first
    //deletePreviousState(source.droppableId, draggableId);

    // Then, add to new state
    //setNewState(destination.droppableId, updatedTask);
  };

  function deletePreviousState(sourceDroppableId, taskId) {
    // Convert sourceDroppableId to match taskType index
    const sourceIndex = parseInt(sourceDroppableId);
    if (sourceIndex === 0)
      setToDo((prev) => prev.filter((item) => item.id !== taskId));
    if (sourceIndex === 1)
      setInProgress((prev) => prev.filter((item) => item.id !== taskId));
    if (sourceIndex === 2)
      setDone((prev) => prev.filter((item) => item.id !== taskId));
  }

  function setNewState(destinationDroppableId, task) {
    // Convert destinationDroppableId to match taskType index
    const destinationIndex = parseInt(destinationDroppableId);
    if (destinationIndex === 0) setToDo((prev) => [task, ...prev]);
    if (destinationIndex === 1) setInProgress((prev) => [task, ...prev]);
    if (destinationIndex === 2) setDone((prev) => [task, ...prev]);
  }
  function findItemById(id, array) {
    return array.find((item) => item.id == id);
  }

  const updateTaskInState = (newTask) => {
    const filteredToDo = toDo.filter((task) => task.id !== newTask.id);
    const filteredInProgress = inProgress.filter(
      (task) => task.id !== newTask.id
    );
    const filteredDone = done.filter((task) => task.id !== newTask.id);
    // Update task in the appropriate state based on its status
    if (newTask.status === "To Do") {
      setToDo((prevTasks) => {
        const taskExists = prevTasks.find((task) => task.id === newTask.id);
        return taskExists
          ? prevTasks.map((task) => (task.id === newTask.id ? newTask : task))
          : [...filteredToDo, newTask];
      });
    } else if (newTask.status === "In Progress") {
      setInProgress((prevTasks) => {
        const taskExists = prevTasks.find((task) => task.id === newTask.id);
        return taskExists
          ? prevTasks.map((task) => (task.id === newTask.id ? newTask : task))
          : [...filteredInProgress, newTask];
      });
    } else if (newTask.status === "Done") {
      setDone((prevTasks) => {
        const taskExists = prevTasks.find((task) => task.id === newTask.id);
        return taskExists
          ? prevTasks.map((task) => (task.id === newTask.id ? newTask : task))
          : [...filteredDone, newTask];
      });
    }
  };

  const handleKanbanDataList = (operation, data) => {
    switch (operation) {
      case "add": {
        setKanbanDataList((prevList) => [...prevList, data]);
        updateTaskInState(data);
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
        updateTaskInState(data);

        break;
      }
      case "delete": {
        setKanbanDataList((prevList) =>
          prevList.filter((currentData) => {
            return currentData.id != data.id;
          })
        );
        updateTaskInState(data);
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
          if (type === "To Do") kanbanDataForSection = toDo;
          else if (type === "In Progress") kanbanDataForSection = inProgress;
          else if (type === "Done") kanbanDataForSection = done;
          return (
            <Section
              key={uuidv4()}
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
