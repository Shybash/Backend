// eventsController.js
const Event = require('../models/Event');

// Function to fetch all events
const getEvents = async (req, res) => {
    cron.schedule('0 * * * *', async () => {
        try {
          // Find events where the scheduled time is in the past
          const pastEvents = await Event.find({ date: { $lt: new Date() } });
          // Remove the past events from the database
          await Event.deleteMany({ _id: { $in: pastEvents.map(event => event._id) } });
          console.log('Expired events removed successfully.');
        } catch (error) {
          console.error('Error removing expired events:', error);
        }
      });
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getEvents };
