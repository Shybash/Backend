const Club=require('../models/Club');

const CreateClub = async (req, res) => {
    const { name, description, category } = req.body;
    if (!name || !description || !category ) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    const club = new Club({ name, description, category});

    try {
        const newClub = await club.save();
        res.status(201).json(newClub);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    CreateClub
};
