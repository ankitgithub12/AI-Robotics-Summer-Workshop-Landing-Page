const User = require('../models/User');
const Enquiry = require('../models/Enquiry');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @route   POST api/user/signup
// @desc    Register a new student/user
exports.userSignup = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'Account with this email already exists',
      });
    }

    // Create user
    user = new User({
      name,
      email,
      phone,
      password,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Create payload
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };

    // Sign JWT
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'supersecretkeyformydashboard123',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          success: true,
          token,
          user: {
            name: user.name,
            email: user.email,
          },
        });
      }
    );
  } catch (error) {
    console.error('Error in userSignup:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during signup',
    });
  }
};

// @route   POST api/user/login
// @desc    Authenticate user & get token
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check user
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Create payload
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };

    // Sign JWT
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'supersecretkeyformydashboard123',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token,
          user: {
            name: user.name,
            email: user.email,
          },
        });
      }
    );
  } catch (error) {
    console.error('Error in userLogin:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
    });
  }
};

// @route   GET api/user/profile
// @desc    Get user details & match active enquiries
exports.getUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized access',
      });
    }

    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User account not found',
      });
    }

    // Check if there is a matching registration in the Enquiry collections
    const enquiry = await Enquiry.findOne({ email: user.email.toLowerCase() });

    res.json({
      success: true,
      user,
      registration: enquiry || null,
    });
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Could not retrieve profile.',
    });
  }
};
