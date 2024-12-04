const Post = require("../models/Post");

const createPostController = async (title, body, userId) => {
  const newPost = await Post.create({ title, body, userId });
  return newPost;
};

const getAllPostController = async () => {
  return await Post.find().populate({
    path: "userId",
    select: "name -_id",
  });
};

const getPostByTitleController = async (title) => {
  return await Post.find({ title });
};

const getPostByIdController = async (id) => {
  const postById = await Post.findById(id).populate({
    path: "userId",
    select: "name -_id",
  });
  return postById;
};

const deletePostController = async (id) => {
  let deletePost = await Post.findByIdAndDelete(id);
  return deletePost;
};

module.exports = {
  createPostController,
  getAllPostController,
  getPostByTitleController,
  getPostByIdController,
  deletePostController,
};
