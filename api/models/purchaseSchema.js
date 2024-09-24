// models/ciudad.js
const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    city: String,
    hotel: String,
    cant: Number,
    days: Number,
    total: Number,
    name: String,
    dni: String,
    lastname: String,
    number: String,
    email: String,
    phone: String,
}, { collection: 'purchases' });

module.exports = mongoose.model('Purchase', purchaseSchema);
