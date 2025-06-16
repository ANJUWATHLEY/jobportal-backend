const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth'); // Import from middleware

router.post('/register', register);
router.post('/login', login);

// Protected dashboard route
router.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: `Welcome to dashboard, ${req.user.email}!`, user: req.user });
});

module.exports = router;

