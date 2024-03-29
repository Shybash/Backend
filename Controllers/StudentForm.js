// Import the required modules
const Student = require('StudentForm'); // Assuming you have a Student model defined

// Define the controller function to fetch student form data grouped by club
const StudentForm= async (req, res) => {
  try {
    // Fetch student form data from the database
    const students = await Student.find();

    // Group students by club
    const groupedStudents = students.reduce((acc, student) => {
      if (!acc[student.club]) {
        acc[student.club] = [];
      }
      acc[student.club].push(student);
      return acc;
    }, {});

    // Respond with the fetched data
    res.json(groupedStudents);
  } catch (error) {
    // If an error occurs, respond with an error message
    console.error('Error fetching student form data:', error);
    res.status(500).json({ message: 'Failed to fetch student form data. Please try again later.' });
  }
};

// Export the controller function
module.exports = {
  StudentForm
};
