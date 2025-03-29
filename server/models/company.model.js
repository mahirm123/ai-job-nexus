
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  logo: {
    type: String
  },
  description: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  employees: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  jobs: [{
    type: Schema.Types.ObjectId,
    ref: 'Job'
  }],
  status: {
    type: String,
    enum: ['Verified', 'Pending', 'Rejected'],
    default: 'Pending'
  }
}, {
  timestamps: true,
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
