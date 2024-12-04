const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");

const createUserController = async (name, username, email, password, role) => {
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    username,
    email,
    password: hashPassword,
    role,
  });
  newUser.save();
  return newUser;
};

const getAllUsersController = async () => {
  if (!User.length) throw new Error("No hay usuarios");
  return await User.find();
};

const getUserByNameController = async (name) => {
  const usersByName = await User.find({ name });
  if (!usersByName.length) throw new Error("No se encontro ese usuario");
  return usersByName;
};

const getUserByIdController = async (id) => {
  const userById = await User.findById(id);
  const userPosts = await Post.find({ userId: id });
  return { user: userById, posts: userPosts };
};

const updateUserController = async (id, name, username, email) => {
  const newUser = { name, username, email };
  const updateUser = await User.findByIdAndUpdate(id, newUser, { new: true });
  return updateUser;
};

const deleteUserController = async (id) => {
  let deleteUser = await User.findByIdAndDelete(id);
  return deleteUser;
};

module.exports = {
  createUserController,
  getAllUsersController,
  getUserByNameController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
};
