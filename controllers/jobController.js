const db = require('../db');

// POST /api/jobs (Protected - Employers only)
exports.createJob = (req, res) => {
  const { title, description, company } = req.body;
  const posted_by = req.user.id; // user id from JWT

  // Validate input
  if (!title || !description || !company) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = "INSERT INTO jobs (title, description, company, posted_by) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, description, company, posted_by], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ 
      message: "Job posted successfully",
      jobId: result.insertId 
    });
  });
};

// GET /api/jobs (Public)
exports.getJobs = (req, res) => {
  // Join with users table to get employer name
  const sql = `
    SELECT j.*, u.name as employer_name 
    FROM jobs j 
    JOIN users u ON j.posted_by = u.id 
    ORDER BY j.id DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json({
      message: "Jobs fetched successfully",
      jobs: results
    });
  });
};

// POST /api/jobs/apply (Protected - Jobseekers only)
exports.applyJob = (req, res) => {
  const { job_id, resume_link } = req.body;
  const user_id = req.user.id; // from JWT

  // Validate input
  if (!job_id || !resume_link) {
    return res.status(400).json({ message: 'Job ID and resume link are required' });
  }

  // Check if job exists
  const checkJobQuery = 'SELECT * FROM jobs WHERE id = ?';
  db.query(checkJobQuery, [job_id], (err, jobResults) => {
    if (err) return res.status(500).json({ error: err });

    if (jobResults.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user already applied
    const checkApplicationQuery = 'SELECT * FROM applications WHERE job_id = ? AND user_id = ?';
    db.query(checkApplicationQuery, [job_id, user_id], (err, appResults) => {
      if (err) return res.status(500).json({ error: err });

      if (appResults.length > 0) {
        return res.status(400).json({ message: 'You have already applied for this job' });
      }

      // Insert application
      const sql = "INSERT INTO applications (job_id, user_id, resume_link) VALUES (?, ?, ?)";
      db.query(sql, [job_id, user_id, resume_link], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ 
          message: "Applied to job successfully",
          applicationId: result.insertId 
        });
      });
    });
  });
};