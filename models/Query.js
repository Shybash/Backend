// models/StudentQuery.js

const mongoose = require('mongoose');

const studentQuerySchema = new mongoose.Schema({
  query: {
    type: String,
    required: true
  },
  suggestion: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Query = mongoose.model('StudentQuery', studentQuerySchema);

module.exports = Query;
