// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Middleware function to verify the token
const verifyToken = (req, res, next) => {
  // Get token from Authorization header
  const token = req.headers['authorization']?.split(' ')[1];  // Assuming format "Bearer token"

  if (!token) {
    return res.status(403).json({ error: 'Access denied. No token provided.' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid or expired token.' });
    }
    
    // Add the decoded user information to the request object
    req.user = decoded;  // This can contain user ID, email, etc.
    next();  // Proceed to the next middleware or route handler
  });
};

export default verifyToken;
