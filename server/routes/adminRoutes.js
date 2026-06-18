const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  adminLogin,
  getEnquiries,
  updateEnquiry,
  deleteEnquiry,
} = require('../controllers/adminController');

// Admin Auth
router.post('/login', adminLogin);

// Manage Enquiries (Protected)
router.get('/enquiries', auth, getEnquiries);
router.put('/enquiries/:id', auth, updateEnquiry);
router.delete('/enquiries/:id', auth, deleteEnquiry);

module.exports = router;
