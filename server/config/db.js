const mongoose = require('mongoose');

const connectDB = async () => {
  const primaryUri = process.env.MONGODB_URI;
  const fallbackUri = 'mongodb://127.0.0.1:27017/workshop_landing_page';

  try {
    console.log('Connecting to primary MongoDB cluster...');
    const conn = await mongoose.connect(primaryUri, {
      serverSelectionTimeoutMS: 5000, // Timeout fast if Atlas is unreachable/IP not whitelisted
    });
    console.log(`MongoDB Connected (Primary Atlas): ${conn.connection.host}`);
  } catch (error) {
    console.warn(`Primary Atlas database connection failed: ${error.message}`);
    console.log('Attempting connection to local MongoDB fallback (mongodb://127.0.0.1:27017)...');
    try {
      const conn = await mongoose.connect(fallbackUri, {
        serverSelectionTimeoutMS: 3000,
      });
      console.log(`MongoDB Connected (Local Fallback): ${conn.connection.host}`);
    } catch (fallbackError) {
      console.error(`Local MongoDB fallback connection failed: ${fallbackError.message}`);
      console.error('========================================================================');
      console.error('WARNING: Could not connect to any MongoDB database.');
      console.error('Server will run in database-offline mode. Database actions will fail.');
      console.error('Please start local MongoDB or update your connection string in server/.env.');
      console.error('========================================================================');
      // Do not call process.exit(1) to let the server start up for UI/frontend testing
    }
  }
};

module.exports = connectDB;
