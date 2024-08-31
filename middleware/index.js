const admin = require("../database/firebase")

async function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.userId = decodedToken.uid;
    next();
  } catch (error) {
    console.error('Error verifying auth token', error);
    res.status(403).json({ message: 'Invalid token' });
  }
}

module.exports = authenticateToken;
