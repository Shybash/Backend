const ClubMember = require('../models/ClubMember');

const GetClubMembers = async (req, res) => {
  try {
    const aggregatedClubMembers = await ClubMember.aggregate([
      // Group by club field using aggregatino in mongodb
      { $group: { _id: '$club', members: { $push: '$$ROOT' } } }
    ]);
    
    // Construct the groupedClubMembers object
    const groupedClubMembers = {};
    aggregatedClubMembers.forEach(({ _id, members }) => {
      groupedClubMembers[_id] = members;
    });
    
    res.json(groupedClubMembers);
  } catch (error) {
    console.error('Error fetching club members:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const deleteClubMember = async (req, res) => {
  try {
    const { clubName, memberId } = req.params;
    await ClubMember.findOneAndDelete({ club: clubName, _id: memberId });
    res.status(200).json({ message: 'Club member deleted successfully' });
  } catch (error) {
    console.error('Error deleting club member:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { GetClubMembers,deleteClubMember};
