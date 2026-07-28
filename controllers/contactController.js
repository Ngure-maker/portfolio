const prisma = require('../config/database');

exports.show = (req, res) => {
  res.render('pages/contact', { title: 'Contact - Ngure' });
};

exports.submit = async (req, res) => {
  try {
    const { name, email, phone, projectType, budget, timeline, description } = req.body;
    if (!name || !email || !description) {
      req.flash('error', 'Please fill in all required fields');
      return res.redirect('/contact');
    }
    await prisma.message.create({
      data: { name, email, phone, projectType, budget, timeline, description },
    });
    req.flash('success', 'Message sent successfully! I will get back to you soon.');
    res.redirect('/contact');
  } catch (err) {
    console.error('Contact error:', err);
    req.flash('error', 'Something went wrong. Please try again.');
    res.redirect('/contact');
  }
};
