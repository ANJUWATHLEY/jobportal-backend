const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register user
exports.register = (req, res) => {
  const { name, email, password, role } = req.body; // Added role field
  console.log("Role from request:", role); // <-- YEH LINE ADD KARO

  // Validate input
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (role !== 'employer' && role !== 'jobseeker') {
    return res.status(400).json({ message: 'Role must be either employer or jobseeker' });
  }

  // Debug: Print role to terminal
  console.log("Role from request:", role);

  const checkUser = "SELECT * FROM users WHERE email = ?";
  db.query(checkUser, [email], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ error: err });

      // Use role variable, not hardcoded value!
      const insertUser = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
      db.query(insertUser, [name, email, hashedPassword, role], (err) => {
        if (err) return res.status(500).json({ error: err });

        res.status(201).json({ message: "User registered successfully" });
      });
    });
  });
};

// Login user
exports.login = (req, res) => {
  const { email, password } = req.body;

  const findUser = "SELECT * FROM users WHERE email = ?";
  db.query(findUser, [email], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = result[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: err });
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Include role in JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role }, 
        process.env.JWT_SECRET, 
        { expiresIn: "24h" }
      );
      
      res.json({ 
        message: "Login successful", 
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    });
  });
};

// JWT middleware
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  jwt.verify(token, "secretkey", (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token.' });
    req.user = user;
    next();
  });
};