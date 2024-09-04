import React from "react";
import Toast from "react-bootstrap/Toast";
import { ToastContainer } from "react-bootstrap";

const MessageToast = ({ message, show, onClose }) => {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast show={show} onClose={onClose} delay={3000} autohide>
        <Toast.Header closeButton>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Notification</strong>
          <small>Just now</small>
        </Toast.Header>
        <Toast.Body className="bg-success">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default MessageToast;
