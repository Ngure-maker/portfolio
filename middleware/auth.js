const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }

  const token = req.cookies?.token;

  if (!token) {
    req.flash('error', 'Please log in to continue');
    return res.redirect('/auth/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.session.user = decoded;
    next();
  } catch (err) {
    req.flash('error', 'Session expired. Please log in again');
    return res.redirect('/auth/login');
  }
};

const requireAdmin = (req, res, next) => {
  if (req.session?.user?.role === 'admin') {
    return next();
  }
  req.flash('error', 'Unauthorized access');
  return res.redirect('/auth/login');
};

module.exports = { requireAuth, requireAdmin };
