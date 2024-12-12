const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: function () {
            return !this.googleId;
        },
    },
    googleId: { type: String, required: function () {
        return !this.password;
    }, unique: true },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
