const Users = require("../DB/UserDB.js");

const getAllUsers = () => {
  return Users.getAllUsers();
};

const getUserById = (id) => {
  return Users.getUser(id);
};

const deleteUserByUsername = (username) => {
  let filter = {
    username: username,
  };
  return Users.deleteOne(filter);
};

module.exports = {
  getAllUsers: getAllUsers,
  getUserById: getUserById,
  deleteUserByUsername: deleteUserByUsername,
};
