import { useState } from "react";
import classes from "../styles/CardDetail.module.css";

const CardDetail = ({
  toggleShowCardDetail,
  cardDetailMode,
  cardData,
  handleDataList,
}) => {
  const [title, setTitle] = useState(cardData.title);
  const [description, setDescription] = useState(cardData.description);
  const [assignee, setAssignee] = useState(cardData.assignee);
  const [status, setStatus] = useState(cardData.status);
  const [priority, setPriority] = useState(cardData.priority);
  const [isDisabled, setIsDisabled] = useState(cardDetailMode === "show");

  const handleTask = (event) => {
    event.preventDefault();
    const newTask = {
      id: cardData.id,
      title,
      description,
      assignee,
      status,
      priority,
    };
    handleDataList(newTask);
    setTitle("");
    setDescription("");
    setAssignee("");
    setStatus("To Do");
    setPriority("High");
    toggleShowCardDetail();
  };
  return (
    <div className={classes.backdrop}>
      <div className={classes.modal}>
        <div className={classes.heading}>
          <h3>{cardDetailMode !== "new" ? "Task" : "New Task"}</h3>
          <span type="button" onClick={toggleShowCardDetail}></span>
        </div>
        <form className={classes.form} onSubmit={handleTask}>
          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isDisabled}
              required
            />
          </label>
          <label>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isDisabled}
              required
            ></textarea>
          </label>
          <label>
            Assignee
            <input
              type="text"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              disabled={isDisabled}
              required
            />
          </label>

          <label>
            Status
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={isDisabled}
              required
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </label>
          <label>
            Priority
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              disabled={isDisabled}
              required
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </label>

          {!isDisabled && (
            <button className={classes.button} type="submit">
              Submit
            </button>
          )}
          {isDisabled && (
            <button
              className={classes.button}
              type="button"
              onClick={() => setIsDisabled(false)}
            >
              Edit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CardDetail;
