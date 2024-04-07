import { useState } from "react";
import classes from "../styles/Section.module.css";
import Card from "./Card";
import CardDetail from "./CardDetail";

const Section = ({ status, kanbanDataList, handleKanbanDataList }) => {
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
      id: String(Number(kanbanDataList.at(-1).id) + 1),
      title: "",
      description: "",
      assignee: "",
      status: status,
      priority: "High",
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
      {dataList.map((currentCardData) => {
        return (
          <Card
            key={currentCardData.id}
            cardData={currentCardData}
            onClickHandler={() => handleCardClick(currentCardData)}
            onDelete={() => deleteCard(currentCardData)}
          />
        );
      })}
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
