
const Event = require('../models/Event');

const addEvent = async (req, res) => {
  try {
    const { name, date, time, ampm, location, description } = req.body;
    const event = new Event({
      name,
      date,
      time: `${time} ${ampm}`,
      location,
      description,
    });
    await event.save();
    console.log('Event added:', event);
    res.status(201).send('Event added successfully');
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).send('Error adding event');
  }
};

module.exports = {
  addEvent,
};
