import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axiosClient from "../config/axiosClient";
import { getItemFromStorage, setItemToStorage } from "../utils/Helper";
import { StorageConstant } from "../constants/Constants";
import MessageToast from "./MessageToast";

const MoneyModel = ({ setShow, setToastShow, setToastMessage }) => {
  const [amount, setAmount] = useState("");

  const handleClose = () => {
    setShow(false);
    setToastShow(false);
  };

  const user = getItemFromStorage(StorageConstant?.info);

  const addMoney = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setToastMessage("Please enter a valid amount.");
      setToastShow(true);
      return;
    }

    try {
      const res = await axiosClient.post("user/addMoney", {
        money: amount,
        email: user.email,
      });

      setItemToStorage("balance", res.data.amount);
      setToastMessage(res.data.message);
      setToastShow(true);
      setShow(false);
    } catch (error) {
      setToastMessage("An error occurred while adding money.");
      setToastShow(true);
    }
  };

  return (
    <>
      <Modal
        show={true}
        onHide={handleClose}
        dialogClassName="custom-dialog"
        backdropClassName="custom-backdrop"
      >
        <Modal.Dialog
          style={{
            backgroundColor: "#1b1b1b",
            borderRadius: "10px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.9)",
          }}
        >
          <Modal.Header closeButton style={{ borderBottom: "1px solid #333" }}>
            <Modal.Title
              style={{
                color: "#f5a623",
                fontFamily: "'Press Start 2P', cursive",
              }}
            >
              Add Money
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="d-flex justify-content-center">
            <Form.Control
              type="number"
              className="w-50 text-center"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                backgroundColor: "#333",
                borderColor: "#f5a623",
                color: "#fff",
                fontFamily: "'Press Start 2P', cursive",
                textAlign: "center",
              }}
            />
          </Modal.Body>

          <Modal.Footer style={{ borderTop: "1px solid #333" }}>
            <Button
              onClick={addMoney}
              variant="primary"
              style={{
                backgroundColor: "#7668f6",
                borderColor: "#f5a623",
                color: "#1b1b1b",
                fontFamily: "'Press Start 2P', cursive",
              }}
            >
              Add
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </>
  );
};

export default MoneyModel;
