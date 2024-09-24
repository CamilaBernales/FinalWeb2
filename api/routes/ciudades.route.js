const express = require("express");
const router = express.Router();
const ciudadController = require("../controllers/ciudad.controller");

router.get("/", ciudadController.getAllCiudades);

router.get("/:ciudadId", ciudadController.getCiudadById);

module.exports = router;
