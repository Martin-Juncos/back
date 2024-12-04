const server = require("./src/server");
const mongoose = require("./src/db/dataBase");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    await mongoose.connection;
    console.log("Conexion con la Base de Datos");
    server.listen(PORT, console.log(`Server listened in port ${PORT}`));
  } catch (error) {
    console.error("Error al conectarnos a la base de datos ", error);
  }
}

main();
