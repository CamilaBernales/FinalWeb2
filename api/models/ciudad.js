// models/ciudad.js
const mongoose = require('mongoose');

const ciudadSchema = new mongoose.Schema({
  id: Number,
  city: String,
  price: Number,
  desc: String,
  img: String,
  hotels: [
    {
      id: Number,
      name: String,
      price: Number
    }
  ]
}, { collection: 'city' });

module.exports = mongoose.model('Ciudad', ciudadSchema);
