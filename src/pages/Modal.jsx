import React from "react";
import { FaTimes, FaRegCalendarAlt, FaInfoCircle, FaClock, FaCheckCircle } from "react-icons/fa";
import "./Modal.css";

const Modal = ({ onClose, title, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
