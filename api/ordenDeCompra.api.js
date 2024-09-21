const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const OrdenSchema = new mongoose.Schema({
  city: String,
  hotel: String,
  cant: Number,
  days: Number,
  total: Number,
});

const Orden = mongoose.model("Orden", OrdenSchema);

// Agregar una nueva orden
router.post("/", async (req, res) => {
  const nuevaOrden = new Orden(req.body);

  try {
    const ordenGuardada = await nuevaOrden.save();
    res.status(201).json(ordenGuardada);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
