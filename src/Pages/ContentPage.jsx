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
    const { destination, source, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    const allTasks = [...toDo, ...inProgress, ...done];
    const task = findItemById(draggableId, allTasks);

    // Ensure task is found
    if (!task) return;

    // Create a copy of task to ensure we're not mutating state directly
    const updatedTask = {
      ...task,
      status: taskType[parseInt(destination.droppableId)],
    };

    // Delete from previous state first
    deletePreviousState(source.droppableId, draggableId);

    // Then, add to new state
    setNewState(destination.droppableId, updatedTask);
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
    // Update task in the appropriate state based on its status
    if (newTask.status === "To Do") {
      setToDo((prevTasks) => {
        const taskExists = prevTasks.find((task) => task.id === newTask.id);
        return taskExists
          ? prevTasks.map((task) => (task.id === newTask.id ? newTask : task))
          : [...prevTasks, newTask];
      });
    } else if (newTask.status === "In Progress") {
      setInProgress((prevTasks) => {
        const taskExists = prevTasks.find((task) => task.id === newTask.id);
        return taskExists
          ? prevTasks.map((task) => (task.id === newTask.id ? newTask : task))
          : [...prevTasks, newTask];
      });
    } else if (newTask.status === "Done") {
      setDone((prevTasks) => {
        const taskExists = prevTasks.find((task) => task.id === newTask.id);
        return taskExists
          ? prevTasks.map((task) => (task.id === newTask.id ? newTask : task))
          : [...prevTasks, newTask];
      });
    }
  };

  const handleKanbanDataList = (operation, data) => {
    switch (operation) {
      case "add": {
        setKanbanDataList((prevList) => [...prevList, data]);
        updateTaskInState(data);
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
