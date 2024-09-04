import React, { useEffect, useState } from "react";
import PageHeader from "./PageHeader";
import { Outlet } from "react-router-dom";
import RouteComponent from "../../router/RouteComponent";
import "./style.css";
import MessageToast from "../../components/MessageToast";
import { getItemFromStorage } from "../../utils/Helper";
import { StorageConstant } from "../../constants/Constants";
const MainLayout = () => {
  const [toastShow, setToastShow] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [balance, setBalance] = useState();
  useEffect(() => {
    // Fetch and set balance when component mounts
    const storedBalance = getItemFromStorage(StorageConstant?.balance);
    if (storedBalance) {
      setBalance(storedBalance);
    }
  }, []);
  return (
    <>
      {toastShow && (
        <MessageToast
          message={toastMessage}
          show={toastShow}
          onClose={() => setToastShow(false)}
        />
      )}

      <header className="header">
        <PageHeader
          balance={balance}
          setBalance={setBalance}
          setToastShow={setToastShow}
          setToastMessage={setToastMessage}
        />
      </header>
      <section
        className="container w-50  mt-3  h-75"
        style={{
          minHeight: "80vh",
          backgroundColor: "transparent",
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <RouteComponent />
      </section>
    </>
  );
};

export default MainLayout;
