const mongoose = require('mongoose');

const clgInfoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College',
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const ClgInfo = mongoose.model('ClgInfo', clgInfoSchema);

module.exports = ClgInfo;
