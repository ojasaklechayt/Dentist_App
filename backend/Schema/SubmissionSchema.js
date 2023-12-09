const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,
    },
    clinic: {
        type: String,
        required: true,
    },
    dentist: {
        type: String,
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
