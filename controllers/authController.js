const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/database');

exports.loginForm = (req, res) => {
  if (req.session?.user) return res.redirect('/admin');
  res.render('pages/login', { title: 'Login - Ngure', layout: false });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      req.flash('error', 'Please provide email and password');
      return res.redirect('/auth/login');
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      req.flash('error', 'Invalid credentials');
      return res.redirect('/auth/login');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      req.flash('error', 'Invalid credentials');
      return res.redirect('/auth/login');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    req.session.user = { id: user.id, email: user.email, name: user.name, role: user.role };
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    req.flash('success', 'Welcome back!');
    res.redirect('/admin');
  } catch (err) {
    console.error('Login error:', err);
    req.flash('error', 'Something went wrong');
    res.redirect('/auth/login');
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.clearCookie('token');
  res.redirect('/');
};
