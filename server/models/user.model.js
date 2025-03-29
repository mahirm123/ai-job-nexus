
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['user', 'employer', 'admin'],
    default: 'user'
  },
  profileImage: {
    type: String
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  },
  savedJobs: [{
    type: Schema.Types.ObjectId,
    ref: 'Job'
  }]
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
