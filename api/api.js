const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/finalweb2", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.log("Error conectando a MongoDB:", err));

const ciudadesRoutes = require("./routes/ciudades.route");
const ordenDeCompraRoutes = require("./routes/ordenDeCompra.route");

app.use("/api/ciudades", ciudadesRoutes);
app.use("/api/purchases", ordenDeCompraRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
