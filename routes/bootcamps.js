const express = require('express');
const {
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  uploadBootcampPhoto
} = require('../controllers/bootcamps');

const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middleware/advancedResults');

// Include other resource routers
const courseRouter = require('./courses');

const router = express.Router();

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/:id/photo').put(uploadBootcampPhoto);

router.route('/').get(advancedResults(Bootcamp, 'courses'), getBootcamps);
router.route('/').post(createBootcamp);

router.route('/:id').get(getBootcamp);
router.route('/:id').put(updateBootcamp);
router.route('/:id').delete(deleteBootcamp);

module.exports = router;
