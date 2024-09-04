import RouterWrap from "./router/RouterWrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Assets } from "./assets/assets";
import { getItemFromStorage } from "./utils/Helper";
import { StorageConstant } from "./constants/Constants";
import { useSocketContext } from "./context/SocketContext";
import { UserProvider } from "./context/UserContext";
import { useEffect } from "react";

function App() {
  const user = getItemFromStorage(StorageConstant?.info);

  const {
    socketConnect,
    socketValue: { socket, socketId },
  } = useSocketContext();

  useEffect(() => {
    if (user && !socketId) {
      socketConnect();
    }
  }, []);

  return (
    <>
      <UserProvider>
        <RouterWrap />
      </UserProvider>
    </>
  );
}

export default App;
