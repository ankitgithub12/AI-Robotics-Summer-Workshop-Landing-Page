const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header
  const authHeader = req.header('Authorization');

  // Check if no header or not starting with Bearer
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'No token, authorization denied',
    });
  }

  // Get token portion
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkeyformydashboard123');
    req.admin = decoded.admin;
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Token is not valid',
    });
  }
};
