import React from "react";
import { Outlet } from "react-router-dom";
import "./BasicLayout.css"; // Ensure this path is correct
import BasicLayoutBG from "/BasicLayoutBG.jpg"; // Ensure the image path is correct

const BasicLayout = () => {
  return (
    <div
      className="basic-layout"
      style={{
        backgroundImage: `url(${BasicLayoutBG})`,
        
      }}
    >
      <div className="overlay">
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
          <div className="login-container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicLayout;
