
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Job = require('../models/job.model');
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

// Get all jobs with filters
router.get('/', async (req, res) => {
  try {
    const { search, location, type, tags, sort, page = 1, limit = 10 } = req.query;
    
    // Build filter object
    const filter = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }
    if (type) {
      filter.type = type;
    }
    if (tags) {
      filter.tags = { $in: tags.split(',') };
    }

    // Build sort object
    let sortOption = {};
    if (sort === 'latest') {
      sortOption = { createdAt: -1 };
    } else if (sort === 'oldest') {
      sortOption = { createdAt: 1 };
    } else if (sort === 'relevance') {
      // Default sort is by relevance
      sortOption = { featured: -1, createdAt: -1 };
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get jobs with pagination
    const jobs = await Job.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('company', 'name logo')
      .exec();

    // Get total count for pagination
    const total = await Job.countDocuments(filter);

    res.json({
      jobs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalJobs: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('company', 'name logo description website location')
      .populate('postedBy', 'firstName lastName');
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new job (requires authentication)
router.post('/', auth, async (req, res) => {
  try {
    const { title, company, location, description, requirements, salary, tags, type } = req.body;
    
    // Verify user is employer or admin
    const user = await User.findById(req.user.id);
    if (!user || (user.role !== 'employer' && user.role !== 'admin')) {
      return res.status(403).json({ message: 'Not authorized to create jobs' });
    }
    
    // Create new job
    const newJob = new Job({
      title,
      company,
      location,
      description,
      requirements,
      salary,
      tags,
      type,
      postedBy: req.user.id
    });
    
    const savedJob = await newJob.save();
    
    // Add job to company's jobs array
    await Company.findByIdAndUpdate(company, { $push: { jobs: savedJob._id } });
    
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Save job for a user
router.post('/:id/save', auth, async (req, res) => {
  try {
    // Check if job exists
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Update user's savedJobs array
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if already saved
    if (user.savedJobs.includes(req.params.id)) {
      return res.status(400).json({ message: 'Job already saved' });
    }
    
    user.savedJobs.push(req.params.id);
    await user.save();
    
    res.json({ message: 'Job saved successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Unsave job for a user
router.delete('/:id/save', auth, async (req, res) => {
  try {
    // Update user's savedJobs array
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.savedJobs = user.savedJobs.filter(
      jobId => jobId.toString() !== req.params.id
    );
    await user.save();
    
    res.json({ message: 'Job removed from saved' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
