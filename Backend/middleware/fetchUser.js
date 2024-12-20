// middleware/fetchUser.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Aliisagoodboy';

const fetchUser = (req, res, next) => {
  // Get the token from the header
  const token = req.header('authToken');
  if (!token) {
    return res.status(401).send({ error: "Please authenticate with a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate with a valid token" });
  }
};

module.exports = fetchUser;
