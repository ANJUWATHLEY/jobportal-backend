const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-netlify-app.netlify.app'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Job Portal API is running!' });
});

// Role validation middleware
app.use((req, res, next) => {
  const { role } = req.body;
  if (role !== 'employer' && role !== 'jobseeker') {
    return res.status(400).json({ message: 'Role must be either employer or jobseeker' });
  }
  next();
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
