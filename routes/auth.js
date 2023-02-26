const express = require('express');
const {
  registerUser,
  loginUser,
  getMe,
  recoverPassword,
  resetPassword,
  updateUserDetails,
  updateUserPassword
} = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/update-details', protect, updateUserDetails);
router.put('/update-password', protect, updateUserPassword);
router.post('/recover-password', recoverPassword);
router.put('/recover-password/:resetToken', resetPassword);

module.exports = router;
