
import { Navigate, Outlet } from "react-router-dom";
import { getItemFromStorage } from "../utils/Helper";
import { StorageConstant } from "../constants/Constants";
import React from "react";






const PrivateRoutes = () => {
    const token = getItemFromStorage(StorageConstant?.is_login_token);

    if (token) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default PrivateRoutes;
