const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error: "));

db.once("open", () => {
  console.log("Connectes to MongoDb");
});

module.exports = mongoose;
