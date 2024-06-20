const Student = require('../models/StudentForm');
const ClubMember = require('../models/ClubMember');

const AcceptStudent = async (req, res) => {
  try {
    const { id } = req.params;
   
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

  
    const clubMember = new ClubMember({
      rollNum: student.rollNum,
      name: student.name,
      contactNumber: student.contactNumber,
      club: student.club
    });
    await clubMember.save();
    // Delete the student from the student list
    await Student.findByIdAndDelete(id);
    res.status(200).json({ message: 'Student accepted and added to club members' });
  } catch (error) {
    console.error('Error accepting student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { AcceptStudent };
