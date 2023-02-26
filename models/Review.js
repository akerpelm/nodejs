const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trime: true,
    required: [true, 'Please enter a title for the review.'],
    maxlength: 100
  },
  text: {
    type: String,
    required: [true, 'Please enter a description of the review']
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'Please enter a rating (1-10).']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

// Prevent user from submitting more than one review per bootcamp.
ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

// Static method to get average of rating of a bootcamp
ReviewSchema.statics.getAverageRating = async function (bootcampId) {
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId }
    },
    {
      $group: {
        _id: '$bootcamp',
        averageRating: { $avg: '$rating' }
      }
    }
  ]);

  try {
    if (obj[0]) {
      await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
        averageRating: obj[0].averageRating.toFixed(1)
      });
    } else {
      await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
        averageRating: undefined
      });
    }
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageCost after save
ReviewSchema.post('save', async function () {
  await this.constructor.getAverageRating(this.bootcamp);
});

// Call getAverageCost before remove
ReviewSchema.post('remove', async function () {
  await this.constructor.getAverageRating(this.bootcamp);
});

module.exports = mongoose.model('Review', ReviewSchema);
