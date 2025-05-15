// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// module.exports = async (req, res, next) => {
//   const token = req.header('Authorization');
//   if (!token) return res.status(401).send('No token');

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select('-password');
//     next();
//   } catch {
//     res.status(401).send('Invalid token');
//   }
// };

const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  // If token is not provided, return 401
  if (!token) return res.status(401).send('No token');

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user from the database based on the decoded ID and exclude password field
    req.user = await User.findById(decoded.id).select('-password');
    
    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails, return 401
    res.status(401).send('Invalid token');
  }
};
