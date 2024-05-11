// Event.js (in your models directory)

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  ampm: { type: String, required: true }, // Add ampm field to store "AM" or "PM"
  venue: { type: String, required: true },
  description: { type: String, required: true }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
