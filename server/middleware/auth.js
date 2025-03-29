
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
    req.user = decoded;
    next();
  } catch (error) {
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
    res.status(500).json({ message: error.message });
  }
};
