import classes from "../styles/Card.module.css";
import deleteImg from "../assets/images/delete.png";
const Card = ({ cardData, onDelete }) => {
  return (
    <div className={classes.container}>
      <h4 className={classes.heading}>{cardData.title}</h4>
      <p className={classes.text}>{cardData.description}</p>
      <button type="button" onClick={onDelete} className={classes.btn}>
        <img src={deleteImg} alt="Delete Image" className={classes.img} />
      </button>
    </div>
  );
};

export default Card;
