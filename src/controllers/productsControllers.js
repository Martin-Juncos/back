const Product = require("../models/Product");

const createProductController = async (
  title,
  price,
  description,
  category,
  image
) => {
  const newProduct = new Product({
    title,
    price,
    description,
    category,
    image,
  });
  newProduct.save();
  return newProduct;
};

const getAllProductsController = async () => {
  if (!Product.length) throw new Error("No hay productos");
  return await Product.find();
};

const getProductByTitleController = async (title) => {
  const ProductsByTitle = await Product.find({ title });
  if (!ProductsByTitle.length) throw new Error("No se encontro ese producto");
  return ProductsByTitle;
};

const getProductByIdController = async (id) => {
  const ProductById = await Product.findById(id);
  return { Product: ProductById };
};

const updateProductController = async (
  id,
  title,
  price,
  description,
  category,
  image
) => {
  const newProduct = { title, price, description, category, image };
  const updateProduct = await Product.findByIdAndUpdate(id, newProduct, {
    new: true,
  });
  return updateProduct;
};

const deleteProductController = async (id) => {
  let deleteProduct = await Product.findByIdAndDelete(id);
  return deleteProduct;
};

module.exports = {
  createProductController,
  getAllProductsController,
  getProductByTitleController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
};
