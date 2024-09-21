const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const CiudadSchema = new mongoose.Schema({
  city: String,
  price: Number,
  desc: String,
  img: String,
  hotels: [HotelSchema],
});

module.exports = mongoose.model("Ciudad", CiudadSchema);
