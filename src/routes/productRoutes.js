const { Router } = require("express");
const {
  getAllProductsHandler,
  getOneHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
} = require("../handlers/productHandler");

const productsRouter = Router();

productsRouter.get("/", getAllProductsHandler);
productsRouter.get("/:id", getOneHandler);
productsRouter.post("/", createProductHandler);
productsRouter.put("/:id", updateProductHandler);
productsRouter.delete("/:id", deleteProductHandler);

module.exports = productsRouter;
