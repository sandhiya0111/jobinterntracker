const jwt = require("jsonwebtoken");

const SESSION_COOKIE_NAME = "jobtracker_session";

function requireSession(req, res, next) {
  const token = req.cookies?.[SESSION_COOKIE_NAME];

  if (!token) {
    return res.status(401).json({ message: "Please log in." });
  }

  try {
    req.session = jwt.verify(token, process.env.AUTH_SECRET);
    return next();
  } catch {
    return res.status(401).json({ message: "Your session has expired. Please log in again." });
  }
}

module.exports = { SESSION_COOKIE_NAME, requireSession };