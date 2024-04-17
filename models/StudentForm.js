const mongoose = require('mongoose');

const StudentFormSchema = new mongoose.Schema({
    rollNum: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    club: {
        type: String,
        required: true
    }
});

const StudentForm = mongoose.model('StudentForm', StudentFormSchema);

module.exports = StudentForm;
