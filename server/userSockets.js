class UserSockets {
  constructor() {
    this.users = {};
  }

  userJoin(socketId, userId) {
    this.users[userId] = socketId;
  }

  getUserSocketId(userId) {
    return this.users[userId];
  }

  removeUserSocketId(userId) {
    delete this.users[userId];
  }
}

module.exports = UserSockets;
