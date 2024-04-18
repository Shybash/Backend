const mongoose = require('mongoose');

const clubMemberSchema = new mongoose.Schema({
  rollNum: String,
  name: String,
  contactNumber: String,
  club: String
});

const ClubMember = mongoose.model('ClubMember', clubMemberSchema);

module.exports = ClubMember;
