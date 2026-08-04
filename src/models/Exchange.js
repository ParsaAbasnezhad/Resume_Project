const mongoose = require('mongoose');

const exchangeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    symbol: {
        type: String,
        required: true,
        uppercase: true,
        maxlength: 10
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    volume: {
        type: Number,
        default: 0
    },
    last_updated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Exchange', exchangeSchema);