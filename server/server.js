require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const enquiryRoutes = require('./routes/enquiryRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Init Middleware
app.use(cors({
  origin: '*', // Allow all origins for testing/ease of use, can restrict in production
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// Define Routes
app.use('/api/enquiry', enquiryRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong on the server',
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running in production-ready mode on port ${PORT}`);
});
