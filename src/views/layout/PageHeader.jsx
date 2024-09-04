import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import MoneyModel from "../../components/MoneyModel";
import { clearStorage, getItemFromStorage } from "../../utils/Helper";
import { StorageConstant } from "../../constants/Constants";
import logo from "/logo.jpg";
import chips from "/chips-16.png";
import { useNavigate } from "react-router-dom";

function PageHeader({ setToastShow, setToastMessage }) {
  const [show, setShow] = useState(false);
  const [balance, setBalance] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch and set balance when component mounts
    const storedBalance = getItemFromStorage(StorageConstant.balance);
    if (storedBalance) {
      setBalance(storedBalance);
    }
  }, []);

  const addMoney = () => {
    setShow(true);
  };

  const handleLogout = () => {
    clearStorage();
    navigate("/login");
  };

  return (
    <>
      {show && (
        <MoneyModel
          setShow={setShow}
          setToastShow={setToastShow}
          setToastMessage={setToastMessage}
        />
      )}
      <header
        className="container-fluid ml-4 w-75 border-dark"
        style={{
          backgroundColor: "#0F121E",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
        }}
      >
        <div className="d-flex flex-row justify-content-between align-items-center">
          <img
            src={logo}
            alt="Logo"
            className="img-fluid rounded-pill p-2"
            style={{ maxHeight: "50px" }}
          />
          <div className="d-flex align-items-center">
            <div className="d-flex flex-row align-items-center justify-content-center rounded">
              <Button
                className="d-flex align-items-center button button-1 button-1--grey"
                variant="dark"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Add Chips"
                style={{ backgroundColor: "#182034" }}
                onClick={addMoney}
              >
                <span
                  className="me-2"
                  style={{
                    fontFamily: "monospace",
                    fontSize: "13px",
                    fontWeight: "bold",
                  }}
                >
                  {balance}
                </span>
                <img src={chips} alt="chips" className="img-fluid" />
              </Button>
            </div>
            <button className="btn text-light" onClick={handleLogout}>
              Logout
            </button>
            {/* <Dropdown className="mx-3">
              <Dropdown.Toggle
                variant="transparent"
                className="text-light"
                //   style={{ backgroundColor: "#182034" }}
                id="dropdownMenuButton"
              >
                profile
              </Dropdown.Toggle>
              <Dropdown.Menu aria-labelledby="dropdownMenuButton">
                <Dropdown.Item href="#">Action</Dropdown.Item>
                <Dropdown.Item href="#">Another action</Dropdown.Item>
                <Dropdown.Item href="#">Something else here</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
          </div>
        </div>
      </header>
    </>
  );
}

export default PageHeader;
