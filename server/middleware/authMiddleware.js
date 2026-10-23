import jwt from 'jsonwebtoken';
import User from '../model/user.js';

export const authMiddleware = async (req, res, next) => {
  let token;

  // 1. check if there is a token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // "Bearer xyz123..." mein se sirf "xyz123..." nikalo
      token = req.headers.authorization.split(' ')[1];

      // 2. Token verify 
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Token se mile ID se user dhoondo, request mein attach karo
      req.user = await User.findById(decoded.id).select('-password');

      // 4. Sab sahi — aage jaane do
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};


export default authMiddleware
