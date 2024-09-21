const express = require("express");
const router = express.Router();
const Ciudad = require("./models/ciudad");

// Obtener todos los hoteles de una ciudad
router.get("/:ciudadId/hoteles", async (req, res) => {
  try {
    const ciudad = await Ciudad.findById(req.params.ciudadId);
    res.json(ciudad.hotels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
