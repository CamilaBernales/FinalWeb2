const Ciudad = require("../models/ciudad");
const getAllCiudades = async (req, res) => {
  try {
    const ciudades = await Ciudad.find();
    res.json(ciudades);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCiudadById = async (req, res) => {
  try {
    const ciudad = await Ciudad.findById(req.params.ciudadId);
    if (!ciudad) {
      return res.status(404).json({ message: "Ciudad no encontrada" });
    }
    res.json(ciudad);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllCiudades,
  getCiudadById,
};
