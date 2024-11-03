const jwt = require('jsonwebtoken');
const secretKey = 'mySecretKey123';

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'No token provided' });

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Unauthorized' });
    req.user = decoded.data; // Attach user data to the request
    next();
  });
};

module.exports = verifyToken;
