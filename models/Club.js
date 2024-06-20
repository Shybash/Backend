

const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'College' } // Reference to College model
});

module.exports = mongoose.model('Club', clubSchema);