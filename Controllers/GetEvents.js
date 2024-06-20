
const Event = require('../models/Event');

const deleteExpiredEvents = async () => {
  try {
    const currentTime = new Date();
    await Event.deleteMany({ date: { $lt: currentTime } });
    console.log('Expired events deleted successfully.');
  } catch (error) {
    console.error('Error deleting expired events:', error);
  }
};

const getEvents = async (req, res) => {
  try {
    await deleteExpiredEvents();

    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getEvents};
