const Admin = require('../models/Admin');
const Enquiry = require('../models/Enquiry');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @route   POST api/admin/login
// @desc    Authenticate admin & get token
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for admin
    let admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Create payload
    const payload = {
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
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
          admin: {
            username: admin.username,
            email: admin.email,
          },
        });
      }
    );
  } catch (error) {
    console.error('Error in adminLogin:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during authentication',
    });
  }
};

// @route   GET api/admin/enquiries
// @desc    Get all enquiries
exports.getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      enquiries,
    });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Could not retrieve enquiries.',
    });
  }
};

// @route   PUT api/admin/enquiries/:id
// @desc    Update status and notes of an enquiry
exports.updateEnquiry = async (req, res) => {
  const { status, notes } = req.body;

  try {
    let enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found',
      });
    }

    // Update fields
    if (status !== undefined) enquiry.status = status;
    if (notes !== undefined) enquiry.notes = notes;

    await enquiry.save();

    res.json({
      success: true,
      message: 'Enquiry updated successfully',
      enquiry,
    });
  } catch (error) {
    console.error('Error updating enquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Could not update enquiry.',
    });
  }
};

// @route   DELETE api/admin/enquiries/:id
// @desc    Delete an enquiry
exports.deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found',
      });
    }

    await Enquiry.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Enquiry removed successfully',
    });
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Could not delete enquiry.',
    });
  }
};
