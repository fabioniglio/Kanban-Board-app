import classes from "../styles/Card.module.css";
import deleteImg from "../assets/images/delete.png";
import descriptionImg from "../assets/images/description.png";
import lowPriority from "../assets/images/low-priority.png";
import mediumPriority from "../assets/images/medium-priority.png";
import highPriority from "../assets/images/high-priority.png";

const Card = ({ cardData, onClickHandler, onDelete }) => {
  return (
    <div className={classes.container} onClick={onClickHandler}>
      <div className={classes.firstLine}>
        <h4 className={classes.heading}>{cardData.title}</h4>
        <div>
          {cardData.priority === "High" && (
            <img
              src={highPriority}
              alt="High Priority"
              className={classes.priority}
            />
          )}
          {cardData.priority === "Medium" && (
            <img
              src={mediumPriority}
              alt="Midium Priority"
              className={classes.priority}
            />
          )}
          {cardData.priority === "Low" && (
            <img
              src={lowPriority}
              alt="Low Priority"
              className={classes.priority}
            />
          )}
          <button type="button" onClick={onDelete} className={classes.btn}>
            <img
              src={deleteImg}
              alt="Delete Image"
              className={classes.btnImg}
            />
          </button>
        </div>
      </div>
      <div className={classes.secondLine}>
        {cardData.description && (
          <div className={classes.descContainer}>
            <img
              src={descriptionImg}
              alt="Description"
              className={classes.descImg}
            />
            <span className={classes.tooltip}>This card has a description</span>
          </div>
        )}
        <span className={classes.assignee}>
          {cardData.assignee.split(" ").reduce((finalStr, currentStr) => {
            return finalStr + currentStr[0].toUpperCase();
          }, "")}
        </span>
      </div>
    </div>
  );
};

export default Card;
