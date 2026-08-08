const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "somebody",
        trim: true
    },
    number: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 15
    },
    message: {
        type: String,
        required:true,
        trim: true,
        minlength: 1
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Chat', chatSchema);