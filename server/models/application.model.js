
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  job: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  applicant: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resume: {
    type: String,
    required: true
  },
  coverLetter: {
    type: String
  },
  status: {
    type: String,
    enum: ['Pending', 'Reviewing', 'Shortlisted', 'Rejected', 'Interview', 'Hired'],
    default: 'Pending'
  },
  notes: {
    type: String
  }
}, {
  timestamps: true,
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
