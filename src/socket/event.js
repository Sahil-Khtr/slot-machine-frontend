export const socketListenEvent = (socket, { setSocketValue }) => {
  if (!socket) return;

  socket.on("connection", () => {
    setSocketValue((prev) => ({
      ...prev,
      socketId: socket.id,
    }));
  });

  socket.on("ONLINE_USER_CHANGED", (onlineUsers) => {
    setSocketValue((prev) => ({
      ...prev,
      onlineUsers,
    }));
  });

  socket.on("RECEIVE_MESSAGE", (data) => {
    console.log("**** RECEIVE_MESSAGE ****");
    console.log(data);
    const messageData = data.messageData;
    setSocketValue((prev) => ({
      ...prev,
      messageData,
    }));
  });

  socket.on("MESSAGE_READ", (messageReadStatus) => {
    console.log("=== MESSAGE_READ ===");
    setSocketValue((prev) => ({
      ...prev,
      messageReadStatus,
    }));
  });

  socket.on("TYPING_NOTIFY", (typingNotify) => {
    console.log("=== TYPING_NOTIFY ===", typingNotify);
    setSocketValue((prev) => ({
      ...prev,
      typingNotify,
    }));
  });

  socket.on("CHAT_ROOM_NOTIFY", ({ message }) => {
    console.log("=== CHAT_ROOM_NOTIFY ===", message);
    setSocketValue((prev) => ({
      ...prev,
      roomNotify: message,
    }));
  });

  socket.on("INVITED_TO_ROOM", ({ message }) => {
    console.log("=== INVITED_TO_ROOM ===", message);
    setSocketValue((prev) => ({
      ...prev,
      invitedNotify: message,
    }));
  });
};
