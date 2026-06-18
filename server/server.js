require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const enquiryRoutes = require('./routes/enquiryRoutes');

const http = require('http');
const socketio = require('socket.io');
const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const server = http.createServer(app);

// Initialize Socket.io
const io = socketio(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.set('io', io);

const PORT = process.env.PORT || 5001;

// Connect Database
connectDB().then(() => {
  // Seed admin user after DB connection is successful
  seedAdmin();
});

// Seed admin user logic
async function seedAdmin() {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash('Admin@12345', 10);
      const defaultAdmin = new Admin({
        username: 'admin',
        email: 'admin@workshop.com',
        password: hashedPassword,
      });
      await defaultAdmin.save();
      console.log('Default Admin user seeded successfully (admin@workshop.com / Admin@12345)');
    }
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
}

// Init Middleware
app.use(cors({
  origin: '*', // Allow all origins for testing/ease of use, can restrict in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Define Routes
app.use('/api/enquiry', enquiryRoutes);
app.use('/api/admin', adminRoutes);

// Socket.io Connection handler
io.on('connection', (socket) => {
  console.log(`Socket client connected: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log('Socket client disconnected');
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong on the server',
  });
});

// Start Server
server.listen(PORT, () => {
  console.log(`Server running in production-ready mode on port ${PORT}`);
});
