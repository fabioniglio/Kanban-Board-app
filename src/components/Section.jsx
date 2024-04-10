import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import classes from "../styles/Section.module.css";
import Card from "./Card";
import { v4 as uuidv4 } from "uuid";
import CardDetail from "./CardDetail";

const Section = ({ status, kanbanDataList, handleKanbanDataList, id }) => {
  const dataList = kanbanDataList.filter((currentData) => {
    return currentData.status === status;
  });

  const [showCardDetail, setShowCardDetail] = useState(false);
  const toggleShowCardDetail = () => {
    setShowCardDetail(!showCardDetail);
  };

  const [cardDetailMode, setCardDetailMode] = useState("new");
  const handleCardDetailMode = (mode) => {
    setCardDetailMode(mode);
  };

  const [cardData, setCardData] = useState({});

  const handleCardData = (cardData) => {
    setCardData(cardData);
  };

  const handleCardClick = (cardDetail) => {
    handleCardDetailMode("show");
    handleCardData(cardDetail);
    toggleShowCardDetail();
  };

  const newCardHandler = () => {
    handleCardDetailMode("new");
    handleCardData({
      id: uuidv4(),
      title: "",
      description: "",
      assignee: "",
      status: status,
      priority: "High",
      dueDate: "",
      createdDate: new Date().toISOString().split("T")[0],
    });
    toggleShowCardDetail();
  };

  const handleDataList = (newCard) => {
    if (kanbanDataList.find((ele) => ele.id === newCard.id))
      handleKanbanDataList("edit", newCard);
    else handleKanbanDataList("add", newCard);
  };

  const deleteCard = (deleteCard) => {
    handleKanbanDataList("delete", deleteCard);
  };

  return (
    <div className={classes.container}>
      <h3>{status}</h3>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={classes.cardsAndButtonContainer}
            // You can use snapshot.isDraggingOver to apply conditional styling
            // style={{
            //   backgroundColor: snapshot.isDraggingOver ? "blue" : "grey",
            // }}
          >
            {dataList.map((currentCardData, index) => (
              <Card
                key={currentCardData.id}
                cardData={currentCardData}
                onClickHandler={() => handleCardClick(currentCardData)}
                onDelete={() => deleteCard(currentCardData)}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <button type="button" className={classes.btn} onClick={newCardHandler}>
        +
      </button>

      {showCardDetail && (
        <CardDetail
          cardDetailMode={cardDetailMode}
          cardData={cardData}
          handleDataList={handleDataList}
          toggleShowCardDetail={toggleShowCardDetail}
        />
      )}
    </div>
  );
};

export default Section;
