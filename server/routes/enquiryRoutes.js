const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { createEnquiry } = require('../controllers/enquiryController');
const { validateEnquiry } = require('../middleware/validation');

router.post(
  '/',
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 3 })
      .withMessage('Name must be at least 3 characters long'),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email address'),
    body('phone')
      .trim()
      .notEmpty()
      .withMessage('Phone number is required')
      .matches(/^[6-9]\d{9}$/)
      .withMessage('Please provide a valid 10-digit Indian mobile number'),
    validateEnquiry,
  ],
  createEnquiry
);

module.exports = router;
