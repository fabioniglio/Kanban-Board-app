import "./Section.css";
import Card from "./Card";
import { useState } from "react";

const Section = ({ status, kanbanDataList }) => {
  const [dataList, setDataList] = useState(
    kanbanDataList.filter((currentData) => {
      return currentData.status === status;
    })
  );

  const deleteCard = (cardId) => {
    setDataList(
      dataList.filter((currentData) => {
        return currentData.id != cardId;
      })
    );
  };

  return (
    <div className="section">
      <h3>{status}</h3>
      {dataList.map((currentData) => {
        return (
          <div key={currentData.id}>
            <Card
              cardData={currentData}
              onDelete={() => deleteCard(currentData.id)}
            />
          </div>
        );
      })}
      <button type="button">+</button>
    </div>
  );
};

export default Section;
