export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    newConvo.unreadCount += 1;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      if (message.senderId === convoCopy.otherUser.id) {
        convoCopy.unreadCount += 1;
      }

      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const resetUnreadCountInStore = (state, payload) => {
  const { conversationId } = payload;

  return state.map((convo) => {
    if (convo.id === conversationId) {
      const convoCopy = { ...convo };
      convoCopy.unreadCount = 0;

      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = { ...convo };
      newConvo.id = message.conversationId;
      newConvo.messages.push(message);
      newConvo.latestMessageText = message.text;
      return newConvo;
    } else {
      return convo;
    }
  });
};

export const prepareConversations = (conversations) => {
  conversations.forEach((convo) => {
    convo.unreadCount = convo.messages.filter(
      (e) => e.read === false && e.senderId === convo.otherUser.id
    ).length;
    // flag last read message
    for (let i = convo.messages.length - 1; i >= 0; i--) {
      if (
        convo.messages[i].read === true &&
        convo.messages[i].senderId !== convo.otherUser.id
      ) {
        convo.messages[i].isLastRead = true;
        break;
      }
    }
  });
  return conversations;
};

export const updateLastReadInStore = (state, payload) => {
  const { conversationId, lastReadMessage } = payload;

  return state.map((convo) => {
    if (convo.id === conversationId) {
      const convoCopy = { ...convo, messages: [...convo.messages] };
      convoCopy.messages.forEach((message) => {
        message.read = true;
        if (lastReadMessage && message.id === lastReadMessage.id) {
          message.isLastRead = true;
        } else {
          message.isLastRead = false;
        }
      });

      return convoCopy;
    } else {
      return convo;
    }
  });
};
