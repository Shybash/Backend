// Import necessary modules
const express = require('express');
const Student = require('../models/Query'); 


const deleteQuery = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.json({ message: 'Student deleted successfully.' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ message: 'Failed to delete student. Please try again later.' });
  }
};

module.exports = deleteQuery;