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

    return res.status(201).json({
      success: true,
      message: 'Registration submitted successfully',
    });
  } catch (error) {
    console.error('Error saving enquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error. Registration could not be submitted.',
    });
  }
};
