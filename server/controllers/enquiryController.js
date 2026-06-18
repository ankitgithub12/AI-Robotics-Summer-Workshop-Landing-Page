const Enquiry = require('../models/Enquiry');

exports.createEnquiry = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    // Create new enquiry document
    const newEnquiry = new Enquiry({
      name,
      email,
      phone,
    });

    // Save to database
    await newEnquiry.save();

    // Emit real-time socket notification
    const io = req.app.get('io');
    if (io) {
      io.emit('new-enquiry', newEnquiry);
    }

    return res.status(201).json({
      success: true,
      message: 'Registration submitted successfully',
      enquiry: newEnquiry,
    });
  } catch (error) {
    console.error('Error saving enquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error. Registration could not be submitted.',
    });
  }
};
