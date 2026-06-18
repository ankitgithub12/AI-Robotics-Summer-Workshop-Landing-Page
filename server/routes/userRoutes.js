const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  userSignup,
  userLogin,
  getUserProfile,
} = require('../controllers/userController');

// User Auth
router.post('/signup', userSignup);
router.post('/login', userLogin);

// Profile & Verification (Protected)
router.get('/profile', auth, getUserProfile);

module.exports = router;
