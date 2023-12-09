const express = require('express');
const router = express.Router();
const submissionController = require('../Controllers/SubmissionController');

router.get('/submissions', submissionController.getSubmissions);
router.post('/submissions', submissionController.createSubmission);

module.exports = router;
