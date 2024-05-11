// eventsController.js

const Event = require('../models/Event');

// Function to create a new event
const addEvent = async (req, res) => {
  try {
    const { title, date, time, ampm, venue, description } = req.body;

    // Combine time and ampm into a single time string
    const eventTime = `${time} ${ampm}`;

    const newEvent = new Event({
      title,
      date,
      time: eventTime, // Store the combined time string
      ampm, // Include the ampm field
      venue,
      description
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {addEvent };
