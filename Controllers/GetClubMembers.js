// controllers/clubMembersController.js

const ClubMember = require('../models/ClubMember');

const GetClubMembers = async (req, res) => {
  try {
    // Fetch all club members from the database
    const clubMembers = await ClubMember.find();
    // Group club members by club
    const groupedClubMembers = {};
    clubMembers.forEach(member => {
      if (!groupedClubMembers[member.club]) {
        groupedClubMembers[member.club] = [];
      }
      groupedClubMembers[member.club].push(member);
    });
    res.json(groupedClubMembers);
  } catch (error) {
    console.error('Error fetching club members:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { GetClubMembers };
