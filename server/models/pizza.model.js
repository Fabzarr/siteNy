const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Pizza', pizzaSchema); 