import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  updateLastRead
} from "./store/conversations";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");
  if (store.getState().user.id) {

    socket.on("add-online-user", (id) => {
      store.dispatch(addOnlineUser(id));
    });

    socket.on("remove-offline-user", (id) => {
      store.dispatch(removeOfflineUser(id));
    });

    socket.on("new-message", (data) => {
      store.dispatch(setNewMessage(data.message, data.sender));
    });

    socket.on("message-read", (data) => {
      store.dispatch(updateLastRead(data.conversationId, data.lastReadMessage, data.recipientId));
    });

  }
});

export default socket;
