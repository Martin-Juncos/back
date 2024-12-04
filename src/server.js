const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mainRouter = require("./routes/main");
require("dotenv").config();
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;

// SDK de Mercado Pago
const { MercadoPagoConfig, Preference } = require("mercadopago");
// Agrega credenciales
const mercadoPagoClient = new MercadoPagoConfig({
  accessToken: MP_ACCESS_TOKEN,
});

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

app.use("/api", mainRouter);

app.get("/", (req, res) => {
  res.send("El Backend está funcionando");
});

app.post("/create_preference", async (req, res) => {
  try {
    const body = {
      items: req.body.map((item) => ({
        title: item.title,
        quantity: Number(item.quantity),
        unit_price: Number(item.price),
        currency_id: "ARS",
      })),
      back_urls: {
        success: "https://martin-juncos.github.io/success/",
        failure: "https://martin-juncos.github.io/failure/",
        pending: "https://martin-juncos.github.io/pending/",
      },
      auto_return: "approved",
    };
    const preference = new Preference(mercadoPagoClient);
    const result = await preference.create({ body });
    res.json({ id: result.id });
  } catch (error) {
    console.error(error);
  }
});

module.exports = app;
