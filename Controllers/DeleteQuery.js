// Import necessary modules
const express = require('express');
const Student = require('../models/Query'); // Assuming you have a Student model defined

// Route to delete a student by ID
const deleteQuery = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the student by ID and delete it
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      // If no student is found with the given ID, return a 404 status code
      return res.status(404).json({ message: 'Student not found.' });
    }

    // If deletion is successful, return a success message
    res.json({ message: 'Student deleted successfully.' });
  } catch (error) {
    // If an error occurs, return a 500 status code and an error message
    console.error('Error deleting student:', error);
    res.status(500).json({ message: 'Failed to delete student. Please try again later.' });
  }
};

module.exports = deleteQuery;