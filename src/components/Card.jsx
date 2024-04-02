import "./Card.css";
import deleteImg from "../assets/images/delete.png";
const Card = ({ cardData, onDelete }) => {
  return (
    <div className="card">
      <h4>{cardData.title}</h4>
      <p>{cardData.description}</p>
      <button type="button" onClick={onDelete}>
        <img src={deleteImg} alt="Delete Image" />
      </button>
    </div>
  );
};

export default Card;
