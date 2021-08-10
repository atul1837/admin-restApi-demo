const Users = require("../mongoSchema/UserSchema.js");

const getAllUsers = () => {
  return Users.find({}).sort("-_id");
};

const getUser = (filter) => {
  return Users.findOne(filter);
};

const deleteOne = (filter) => {
  return Users.deleteOne(filter);
};

module.exports = {
  getAllUsers: getAllUsers,
  getUser: getUser,
  deleteOne: deleteOne,
};
