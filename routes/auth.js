const express = require('express');
const {
  registerUser,
  loginUser,
  getMe,
  recoverPassword
} = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.post('/recover-password', recoverPassword);

module.exports = router;
