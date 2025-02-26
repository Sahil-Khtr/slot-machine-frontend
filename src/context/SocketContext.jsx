import PropTypes from "prop-types";
import React, { createContext, useContext, useState, useCallback } from "react";
import { initSocket } from "../socket";
// import { initSocket } from "socket";
// import { initSocket, useSocket } from "socket";
// import { initSocket } from '../socket';

const INIT_SOCKET_STATE = {
  socket: null,
  socketId: null,
  onlineUsers: null,
  messageData: null,
  messageReadStatus: null,
  typingNotify: null,
  typing: null,
  roomNotify: null,
  invitedNotify: null,
};

const SocketContext = createContext(INIT_SOCKET_STATE);
export const useSocketContext = () => useContext(SocketContext);

function SocketContextProvider({ children }) {
  const [socketValue, setSocketValue] = useState(INIT_SOCKET_STATE);
  // const { socket, disconnect, socketValue, setSocketValue } = useSocket();

  const socketConnect = useCallback(() => {
    return initSocket({ setSocketValue });
  }, []);

  const resetSocketValue = useCallback((key) => {
    key
      ? setSocketValue((prev) => ({ ...prev, [key]: null }))
      : setSocketValue(INIT_SOCKET_STATE);
  }, []);

  return (
    <SocketContext.Provider
      value={{ socketValue, socketConnect, setSocketValue, resetSocketValue }}
    >
      {children}
    </SocketContext.Provider>
  );
}

SocketContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SocketContextProvider;
