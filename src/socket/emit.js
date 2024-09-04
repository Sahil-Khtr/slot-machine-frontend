export const socketEmitEvent = (socket) => {
  return {
    callback: (error) => {
      if (error) {
        alert(error);
        // window.location.href = "/";
      }
    },
    userOnline: (userId, socketId) => {
      console.log("kh rha h online h");

      if (socket) socket.emit("USER_ONLINE", userId, socketId);
    },
    userOffline: (userId) => {
      if (socket) socket.emit("USER_OFFLINE", userId);
    },
    sendMessage: (messageData) => {
      if (socket) {
        console.log("=== socket ===");
        console.log("send message emit", messageData);
        console.log(messageData);

        socket.emit("SEND_MESSAGE", messageData);
      }
    },
    updateMessageStatus: (updatedData) => {
      if (socket) {
        console.log("socket ", updatedData);
        socket.emit("UPDATE_MESSAGE_STATUS", updatedData);
      }
    },
    updateMessageReaders: (updatedData) => {
      if (socket) {
        console.log("socket ", updatedData);
        socket.emit("UPDATE_MESSAGE_READERS", updatedData);
      }
    },
    userTyping: (typingNotify) => {
      if (socket) {
        console.log("=== user typing ===", typingNotify);
        socket.emit("USER_TYPING", typingNotify);
      }
    },
    enterChatRoom: (data) => {
      if (socket) {
        console.log("=== enter chat room ===", data);
        socket.emit("ENTER_CHAT_ROOM", data);
      }
    },
    leaveChatRoom: (data) => {
      if (socket) {
        console.log("=== leave chat room ===", data);
        socket.emit("LEAVE_CHAT_ROOM", data);
      }
    },
    roomCreated: (data) => {
      if (socket) {
        console.log("** create room **", data);
        socket.emit("ROOM_CREATED", data);
      }
    },
  };
};
