const mongoose = require('mongoose');

const category = ['Exchanges', 'Projects'];

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    authors:{
        type: [String],
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    first_description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 60,
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 60,
    },
    category:{
        type: String,
        required: true,
        enum: category
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);