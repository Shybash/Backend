const Student = require('../models/Stdinfo'); 

const Profile = async (req, res) => {
    try {
        const userId = req.params.userId || req.user._id; 
        const student = await Student.findById(userId);

        if (!student) {
            console.log("student not found");
            return res.status(404).json({ error: 'Student not found' });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = Profile;
