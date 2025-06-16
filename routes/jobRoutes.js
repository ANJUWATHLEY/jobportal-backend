const express = require('express');
const router = express.Router();
const { createJob, getJobs, applyJob } = require('../controllers/jobController');
const { verifyToken, requireEmployer, requireJobseeker } = require('../middleware/auth');

// Public route
router.get('/', getJobs);                                    // GET /api/jobs

// Protected routes with role-based access
router.post('/', verifyToken, requireEmployer, createJob);   // POST /api/jobs (employers only)
router.post('/apply', verifyToken, requireJobseeker, applyJob); // POST /api/jobs/apply (jobseekers only)

module.exports = router;
