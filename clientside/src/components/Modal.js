// ConfirmationModal.js
import React from "react";
import ReactDOM from "react-dom";
import Button from "./Button";

const Modal = ({ onCancel, message }) => {
  const modalStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const contentStyle = {
    background: "white",
    padding: "10px",
    borderRadius: "8px",
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return ReactDOM.createPortal(
    <div style={modalStyle} onClick={handleOverlayClick}>
      <div style={contentStyle}>
        <p style={{color: "black", fontWeight:"500", padding: "5px"}}>{message}</p>
        <div style={{width: "150px", margin: "0 auto"}}>
          <Button onClick={onCancel}>OK</Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
