const { Router } = require("express");
const usersRouter = require("./userRoutes");
const productsRouter = require("./productRoutes");
const postsRouter = require("./postsRoutes");
const authRoutes = require("./authRoutes");
const mainRouter = Router();

//Auth
mainRouter.use("/auth", authRoutes);
// Users
mainRouter.use("/users", usersRouter);
// Posts
mainRouter.use("/posts", postsRouter);
// Products
mainRouter.use("/products", productsRouter);

module.exports = mainRouter;
