// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {type: String,required: true},
  date: {type: Date,required: true},
  time: { type: String,required: true},
  location: {type: String,required: true},
  description: {type: String,required: true}
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
