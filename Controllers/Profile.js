const Student = require('../models/Stdinfo'); // Assuming you have a Student model

// Define the route handler as an arrow function
const Profile = async (req, res) => {
    const userId = req.params.userId;

    try {
        const student = await Student.findById(userId);
        if (!student) {
            return res.status(404).send('Student not found');
        }
        
        res.json(student);
    } catch (error) {
        console.error('Error fetching student', error);
        res.status(500).send('Error fetching student');
    }
};

module.exports = Profile;
