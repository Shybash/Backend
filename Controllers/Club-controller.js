const express = require('express');
const router = express.Router();
const Club = require('../models/Club');

// Get all clubs
const getAllClubs = async (req, res) => {
    try {
        const clubs = await Club.find();
        res.json(clubs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a club
const createClub = async (req, res) => {
    const { name, description, category, createdBy } = req.body;
    const club = new Club({ name, description, category, createdBy });

    try {
        const newClub = await club.save();
        res.status(201).json(newClub);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Exporting the route handlers
module.exports = {
    getAllClubs,
    createClub
};
