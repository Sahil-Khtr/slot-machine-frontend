import { Navigate, Outlet } from "react-router-dom";
import { getItemFromStorage } from "../utils/Helper";
import { StorageConstant } from "../constants/Constants";

const PrivateRoutes = () => {
  const token = getItemFromStorage(StorageConstant?.is_login_token);

  if (!token) {
    return <Navigate to={"login"} />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
