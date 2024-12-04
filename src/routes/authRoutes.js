const { Router } = require("express");
const { registerHandler, loginHandler } = require("../handlers/authHandler");

const authRoutes = Router();

authRoutes.post("/register", registerHandler);
authRoutes.post("/login", loginHandler);

module.exports = authRoutes;
