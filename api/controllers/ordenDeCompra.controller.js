const Purchase = require("../models/purchaseSchema");

const createPurchase = async (req, res) => {
  const nuevaOrden = new Purchase(req.body);
  try {
    const ordenGuardada = await nuevaOrden.save();
    res.status(201).json(ordenGuardada);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getPurchasesByDNI = async (req, res) => {
  try {
    const purchases = await Purchase.find({ dni: req.params.dni }).sort({ createdAt: -1 });
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPurchase,
  getPurchasesByDNI,
};
