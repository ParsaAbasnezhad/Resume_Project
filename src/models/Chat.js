const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "somebody",
        trim: true
    },
    number: {
        type: String,
        required: [true, 'شماره تماس الزامی است'],
        trim: true,
        minlength: [10, 'شماره تماس حداقل 10 رقم است'],
        maxlength: [15, 'شماره تماس حداکثر 15 رقم است']
    },
    message: {
        type: String,
        required: [true, 'متن پیام الزامی است'],
        trim: true,
        minlength: [1, 'پیام نمی‌تواند خالی باشد']
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Chat', chatSchema);