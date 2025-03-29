
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Company = require('../models/company.model');
const User = require('../models/user.model');

// Middleware to authenticate user
const auth = async (req, res, next) => {
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

// Admin middleware
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied, admin only' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all companies with filters
router.get('/', auth, async (req, res) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;
    
    // Build filter object
    const filter = {};
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }
    if (status) {
      filter.status = status;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get companies with pagination
    const companies = await Company.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    // Get total count for pagination
    const total = await Company.countDocuments(filter);

    res.json({
      companies,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      totalCompanies: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get company by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const company = await Company.findById(req.params.id)
      .populate('jobs')
      .populate('employees', 'firstName lastName email');
    
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new company (requires authentication)
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, logo, website, location } = req.body;
    
    // Create new company
    const newCompany = new Company({
      name,
      description,
      logo,
      website,
      location,
      employees: [req.user.id]
    });
    
    const savedCompany = await newCompany.save();
    
    // Add company to user's companies
    await User.findByIdAndUpdate(req.user.id, { 
      $push: { companies: savedCompany._id },
      role: 'employer'  // Update user role to employer
    });
    
    res.status(201).json(savedCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update company (requires admin or company employee)
router.put('/:id', auth, async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    
    // Check if user is admin or company employee
    const user = await User.findById(req.user.id);
    const isCompanyEmployee = company.employees.includes(req.user.id);
    
    if (user.role !== 'admin' && !isCompanyEmployee) {
      return res.status(403).json({ message: 'Not authorized to update this company' });
    }
    
    // Update company fields
    const { name, description, logo, website, location, status } = req.body;
    
    if (name) company.name = name;
    if (description) company.description = description;
    if (logo) company.logo = logo;
    if (website) company.website = website;
    if (location) company.location = location;
    if (status && user.role === 'admin') company.status = status;
    
    const updatedCompany = await company.save();
    
    res.json(updatedCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify company (admin only)
router.put('/:id/verify', auth, isAdmin, async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    
    company.status = 'Verified';
    const updatedCompany = await company.save();
    
    res.json(updatedCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete company (admin only)
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    
    // Remove company from employees' companies arrays
    await User.updateMany(
      { companies: req.params.id }, 
      { $pull: { companies: req.params.id } }
    );
    
    await company.deleteOne();
    
    res.json({ message: 'Company removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
