const express = require("express");
const router = express.Router();
const ordenDeCompraController = require("../controllers/ordenDeCompra.controller");

router.post("/", ordenDeCompraController.createPurchase);

router.get("/:dni", ordenDeCompraController.getPurchasesByDNI);

module.exports = router;
