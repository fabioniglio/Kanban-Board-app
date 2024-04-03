import { useState } from "react";
import classes from "../styles/Section.module.css";
import Card from "./Card";

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
    <div className={classes.container}>
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
      <button type="button" className={classes.btn}>
        +
      </button>
    </div>
  );
};

export default Section;
