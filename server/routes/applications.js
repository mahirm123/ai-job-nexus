
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Application = require('../models/application.model');
const Job = require('../models/job.model');
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

// Submit a job application
router.post('/', auth, async (req, res) => {
  try {
    const { jobId, resume, coverLetter } = req.body;
    
    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check if user already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user.id
    });
    
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }
    
    // Create new application
    const newApplication = new Application({
      job: jobId,
      applicant: req.user.id,
      resume,
      coverLetter,
      status: 'Pending'
    });
    
    const savedApplication = await newApplication.save();
    
    // Add application to job's applications array
    await Job.findByIdAndUpdate(jobId, {
      $push: { applications: savedApplication._id }
    });
    
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get applications for a user
router.get('/user', auth, async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate('job', 'title company')
      .populate('job.company', 'name logo')
      .sort({ createdAt: -1 });
    
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get applications for a job (for employers)
router.get('/job/:jobId', auth, async (req, res) => {
  try {
    const { jobId } = req.params;
    
    // Check if user is employer and owns the job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    const user = await User.findById(req.user.id);
    if (!user || (user.role !== 'admin' && job.postedBy.toString() !== req.user.id)) {
      return res.status(403).json({ message: 'Not authorized to view these applications' });
    }
    
    const applications = await Application.find({ job: jobId })
      .populate('applicant', 'firstName lastName email')
      .sort({ createdAt: -1 });
    
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update application status (for employers)
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    
    // Find application
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // Check if user is employer and owns the job
    const job = await Job.findById(application.job);
    const user = await User.findById(req.user.id);
    
    if (!user || (user.role !== 'admin' && job.postedBy.toString() !== req.user.id)) {
      return res.status(403).json({ message: 'Not authorized to update this application' });
    }
    
    // Update application
    application.status = status || application.status;
    if (notes) application.notes = notes;
    
    await application.save();
    
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
