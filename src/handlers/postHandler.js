const {
  createPostController,
  getAllPostController,
  getPostByTitleController,
  getPostByIdController,
  deletePostController,
} = require("../controllers/postsControllers");

const getAllPostsHandler = async (req, res) => {
  try {
    const { title } = req.query;
    if (title) {
      const response = await getPostByTitleController(title);
      res.send(response);
    } else {
      const response = await getAllPostController();
      res.send(response);
    }
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

const getOnePostHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getPostByIdController(id);
    res.send(response);
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

const createPostHandler = async (req, res) => {
  try {
    const { title, body, userId } = req.body;
    const response = await createPostController(title, body, userId);
    res.send(response);
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

const updatePostHandler = (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  res.send("Modificando un post");
};

const deletePostHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deletePostController(id);
    res.send(response);
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

module.exports = {
  getAllPostsHandler,
  getOnePostHandler,
  createPostHandler,
  updatePostHandler,
  deletePostHandler,
};
