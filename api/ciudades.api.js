const express = require("express");
const router = express.Router();
const Ciudad = require("./models/ciudad");

// Obtener todas las ciudades
router.get("/", async (req, res) => {
  try {
    const ciudades = await Ciudad.find();
    res.json(ciudades);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Agregar nuevas ciudades
router.post("/", async (req, res) => {
  const nuevaCiudad = new Ciudad(req.body);

  try {
    const ciudadGuardada = await nuevaCiudad.save();
    res.status(201).json(ciudadGuardada);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
