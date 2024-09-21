const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Configuración del servidor Express
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose
  .connect("mongodb://localhost:27017/finalweb2", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.log("Error conectando a MongoDB:", err));

// Importa las rutas
const ciudadesRoutes = require("./ciudades.api");
const hotelesRoutes = require("./hotel.api");
const ordenDeCompraRoutes = require("./ordenDeCompra.api");

// Usa las rutas
app.use("/api/ciudades", ciudadesRoutes);
app.use("/api/hoteles", hotelesRoutes);
app.use("/api/ordenDeCompra", ordenDeCompraRoutes);

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
