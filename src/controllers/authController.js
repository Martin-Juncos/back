const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (
  name,
  username,
  email,
  password,
  role = "user"
) => {
  try {
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("Usuario ya registrado con ese email");
    }

    // Encriptar la contraseña
    const hashPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = new User({
      name,
      username,
      email,
      password: hashPassword,
      role,
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    // Generar un token JWT
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      "mi_clave_secreta",
      {
        expiresIn: "1h",
      }
    );

    // Retornar el usuario y el token
    return { user: newUser, token };
  } catch (error) {
    // Manejo de errores
    throw new Error(`Error al registrar usuario: ${error.message}`);
  }
};

const loginController = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("El usuario no esta registrado");
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Contraseña incorrecta");
  }
  const token = jwt.sign({ id: user.id, role: user.role }, "my_secret_key", {
    expiresIn: "1h",
  });

  const { password: _, ...userWhioutPasswor } = user;

  return {
    message: "Inicio de sesion exitoso",
    token,
    user: userWhioutPasswor,
  };
};

module.exports = {
  registerController,
  loginController,
};
