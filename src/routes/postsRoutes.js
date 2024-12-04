const { Router } = require("express");
const {
  getAllPostsHandler,
  getOnePostHandler,
  createPostHandler,
  updatePostHandler,
  deletePostHandler,
} = require("../handlers/postHandler");
const postsRouter = Router();

postsRouter.get("/", getAllPostsHandler);
postsRouter.get("/:id", getOnePostHandler);
postsRouter.post("/", createPostHandler);
postsRouter.put("/:id", updatePostHandler);
postsRouter.delete("/:id", deletePostHandler);

module.exports = postsRouter;
