const users = [];

function userJoin(socketId, userId) {
  const user = {socketId, userId}
  users.push(user);
  console.log(users)
  return user;
}

function getUserSocketId(userId) {
  return users.find(user => user.userId === userId);
}

function removeUserSocketId(userId) {
  const user =  users.find(user => user.userId === userId)
  index = users.indexOf(user);
  if (index > -1) {
    users.splice(index, 1);
  }
}

module.exports = {
  getUserSocketId,
  removeUserSocketId,
  userJoin,
};
