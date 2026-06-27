const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }

  const token = authHeader.split(' ')[1];

  if (!token || token === 'undefined' || token === 'null') {
    return res.status(401).json({ success: false, message: 'Not authorized, invalid token format' });
  }

  try {
    // Decode token
    const jwtSecret = process.env.JWT_SECRET || 'super_secret_jwt_key_please_change';
    const decoded = jwt.verify(token, jwtSecret);

    // Attach admin to request
    if (decoded.id === 'env_admin') {
      req.admin = { username: process.env.ADMIN_USERNAME || 'Prosperdesign' };
    } else {
      req.admin = await Admin.findById(decoded.id).select('-password');
    }
    
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    return res.status(401).json({ success: false, message: 'Not authorized, token validation failed' });
  }
};

module.exports = { protect };
