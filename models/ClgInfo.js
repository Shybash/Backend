const mongoose = require('mongoose');

const collegeInfoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College', 
        required: true,
    },
    collegeName: {
        type: String,
        required: true,
    },
    collegeCode: { 
        type: String, 
        required: true,
    },
    imageName: {
        type: String,
    },
    created: { 
        type: Date, 
        default: Date.now 
    }
});

let CollegeInfo = mongoose.model('CollegeInfo', collegeInfoSchema);

module.exports = CollegeInfo;
