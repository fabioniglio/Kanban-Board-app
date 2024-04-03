import classes from "../styles/Section.module.css";
import Card from "./Card";
import Modal from "./Modal";
import { useState } from "react";

const Section = ({ status, kanbanDataList }) => {
  const [dataList, setDataList] = useState(
    kanbanDataList.filter((currentData) => {
      return currentData.status === status;
    })
  );
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleCardSelect = (cardData) => {
    setSelectedCard(cardData);
    setIsModalOpen(true); // Open the modal
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const deleteCard = (cardId) => {
    setDataList(
      dataList.filter((currentData) => {
        return currentData.id != cardId;
      })
    );
  };

  return (
    <div className={classes.container}>
      <h3>{status}</h3>
      {dataList.map((currentData) => {
        return (
          <div
            key={currentData.id}
            onClick={() => handleCardSelect(currentData)}
          >
            <Card
              cardData={currentData}
              onDelete={() => deleteCard(currentData.id)}
            />
          </div>
        );
      })}
      <button type="button" className={classes.btn} onClick={toggleModal}>
        +
      </button>
      <Modal
        show={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCard(null);
        }}
      >
        {selectedCard && (
          <div className="modal-content">
            <h3>{selectedCard.title}</h3>
            <p>
              <strong>Description:</strong> {selectedCard.description}
            </p>
            <p>
              <strong>Assignee:</strong> {selectedCard.assignee}
            </p>
            <p>
              <strong>Status:</strong> {selectedCard.status}
            </p>
            <p>
              <strong>Priority:</strong> {selectedCard.priority}
            </p>
            <p>
              <strong>Due Date:</strong> {selectedCard.dueDate}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Section;
