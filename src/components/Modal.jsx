import React from "react";
import classes from "../styles/Modal.module.css";

const Modal = ({ show, children, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={classes.backdrop} onClick={onClose}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        {children}
        <button className={classes.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
