const Submission = require('../Schema/SubmissionSchema');

const getSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find(req.query); // Using req.query to filter based on available query parameters
        res.json(submissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createSubmission = async (req, res) => {
    const submissionData = req.body;

    try {
        const newSubmission = await Submission.create(submissionData);
        res.status(201).json(newSubmission);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getSubmissions,
    createSubmission,
};
