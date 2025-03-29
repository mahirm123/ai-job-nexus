
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Middleware to authenticate user
exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    
    // Set user ID and role in the request object
    req.user = {
      id: decoded.id,
      role: decoded.role
    };
    
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Check if user is admin
exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied, admin only' });
    }
    next();
  } catch (error) {
    console.error('Admin authorization error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Check if user is employer or admin
exports.isEmployerOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || (user.role !== 'employer' && user.role !== 'admin')) {
      return res.status(403).json({ message: 'Access denied, employer or admin only' });
    }
    next();
  } catch (error) {
    console.error('Employer authorization error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Mock authentication for demo purposes
// This will allow frontend testing without a running backend
exports.mockAuth = (req, res, next) => {
  // This is only for development and should be removed in production
  const mockUsers = {
    'candidate@example.com': {
      id: 'mock-candidate-id',
      email: 'candidate@example.com',
      firstName: 'John',
      lastName: 'Candidate',
      role: 'user',
      profileImage: null
    },
    'employer@example.com': {
      id: 'mock-employer-id',
      email: 'employer@example.com',
      firstName: 'Jane',
      lastName: 'Employer',
      role: 'employer',
      profileImage: null
    },
    'admin@example.com': {
      id: 'mock-admin-id',
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      profileImage: null
    }
  };
  
  if (req.method === 'POST' && req.path === '/users/login') {
    const { email, password } = req.body;
    const user = mockUsers[email];
    
    if (user && (password === 'password123' || password === 'admin123')) {
      // Simulate successful login
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '1d' }
      );
      
      return res.json({ token, user });
    } else {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
  }
  
  if (req.method === 'GET' && req.path === '/users/profile') {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
      // Find the mock user
      const user = Object.values(mockUsers).find(u => u.id === decoded.id);
      if (user) {
        return res.json(user);
      }
    } catch (error) {
      // Token verification failed
    }
  }
  
  // Continue to actual implementation if not handled by mock
  next();
};
