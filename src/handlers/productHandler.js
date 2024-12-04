const {
  createProductController,
  getAllProductsController,
  getProductByTitleController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
} = require("../controllers/productsControllers");
const Joi = require("joi");

const ProductSchema = Joi.object({
  title: Joi.string().min(3).required(),
  price: Joi.number().min(3).required(),
  description: Joi.string().min(3).required(),
  category: Joi.string().min(3).required(),
  image: Joi.string().min(3).required(),
});

const getAllProductsHandler = async (req, res) => {
  try {
    const { title } = req.query;
    if (title) {
      const response = await getProductByTitleController(title);
      res.status(200).send(response);
    } else {
      const response = await getAllProductsController();
      res.status(200).send(response);
    }
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

const getOneHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getProductByIdController(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

const createProductHandler = async (req, res) => {
  try {
    const { error } = ProductSchema.validate(req.body);
    if (error) res.status(400).send(error.details[0].message);

    const { title, price, description, category, image } = req.body;
    const response = await createProductController(
      title,
      price,
      description,
      category,
      image
    );

    res.status(201).send(response);
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

const updateProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, description, category, image } = req.body;
    const response = await updateProductController(
      id,
      title,
      price,
      description,
      category,
      image
    );
    res.send(response);
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

const deleteProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteProductController(id);
    res.send(response);
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

module.exports = {
  getAllProductsHandler,
  getOneHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
};
