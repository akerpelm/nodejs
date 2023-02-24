const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trime: true,
    required: [true, 'Please enter a course title.']
  },
  description: {
    type: String,
    required: [true, 'Please enter a description']
  },
  duration: {
    type: String,
    required: [true, 'Please enter a course duration in weeks']
  },
  tuition: {
    type: Number,
    required: [true, 'Please add a tuition cost.']
  },
  minimumSkill: {
    type: String,
    required: [true, 'Please add a minimum skill'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true
  }
});

module.exports = mongoose.model('Course', CourseSchema);