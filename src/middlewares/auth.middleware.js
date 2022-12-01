const jwt = require('jsonwebtoken');
require('dotenv/config');

const secret = process.env.JWT_SECRET || 'seuSegredoAqui';

module.exports = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.decoded = decoded;

    next();
  } catch (e) {
    console.log(e.message);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};