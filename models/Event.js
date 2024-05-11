// EventModel.js
const mongoose = require('mongoose');

// Define event schema
const eventSchema = new mongoose.Schema({
  title: String,
  date: Date,
  time: String,
  venue: String,
  description: String
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
