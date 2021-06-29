class UserSockets {
  constructor() {
    this.users = [];
  }

  userJoin(socketId, userId) {
    const user = { socketId, userId };
    this.users.push(user);
    return user;
  }

  getUserSocketId(userId) {
    return this.users.find((user) => user.userId === userId);
  }

  removeUserSocketId(userId) {
    const user = this.users.find((user) => user.userId === userId);
    const index = this.users.indexOf(user);
    if (index > -1) {
      this.users.splice(index, 1);
    }
  }
}

module.exports = UserSockets;
