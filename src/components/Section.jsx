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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");

  const handleCardSelect = (cardData) => {
    setSelectedCard(cardData);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedCard({
      id: null,
      title: "",
      description: "",
      assignee: "",
      status: status,
      priority: "",
      createdDate: "",
      dueDate: "",
    });
    setModalMode("add");
    setIsModalOpen(true);
  };

  const deleteCard = (cardId) => {
    setDataList(
      dataList.filter((currentData) => {
        return currentData.id != cardId;
      })
    );
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newCard = {
      ...selectedCard,
      id: Date.now().toString(),
    };
    setDataList([...dataList, newCard]);
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (selectedCard && selectedCard.id) {
      const updatedDataList = dataList.map((item) =>
        item.id === selectedCard.id ? { ...item, ...selectedCard } : item
      );
      setDataList(updatedDataList);
      setIsModalOpen(false);
      setSelectedCard(null);
    } else {
      console.log("Error: selectedCard.id is not set correctly.");
    }
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
      <button type="button" className={classes.btn} onClick={handleAddNew}>
        +
      </button>
      <Modal
        show={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCard(null);
          setModalMode("add");
        }}
      >
        {selectedCard && (
          <form
            onSubmit={modalMode === "add" ? handleAddSubmit : handleEditSubmit}
            className="modal-content"
          >
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={selectedCard.title}
              onChange={(e) =>
                setSelectedCard({ ...selectedCard, title: e.target.value })
              }
            />

            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={selectedCard.description}
              onChange={(e) =>
                setSelectedCard({
                  ...selectedCard,
                  description: e.target.value,
                })
              }
            ></textarea>

            <button type="submit" className="button">
              Save Changes
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default Section;
