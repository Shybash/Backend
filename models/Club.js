// models/club.js

const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
});

module.exports = mongoose.model('Club', clubSchema);