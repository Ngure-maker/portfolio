const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3002;

const mainRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const apiRoutes = require('./routes/api');

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));

app.use(compression());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'portfolio-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  },
}));
app.use(flash());
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: process.env.NODE_ENV === 'production' ? '1y' : 0,
  etag: true,
}));

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main');

app.locals.siteUrl = process.env.SITE_URL || 'http://localhost:3000';
app.locals.currentYear = new Date().getFullYear();

app.use((req, res, next) => {
  const successMsgs = req.flash('success');
  const errorMsgs = req.flash('error');
  res.locals.success = successMsgs.length > 0 ? successMsgs[0] : null;
  res.locals.error = errorMsgs.length > 0 ? errorMsgs[0] : null;
  res.locals.user = req.session?.user || null;
  res.locals.currentPath = req.path;
  next();
});

app.use((req, res, next) => {
  const prisma = require('./config/database');
  prisma.setting.findMany()
    .then(settings => {
      const s = {};
      settings.forEach(item => { s[item.key] = item.value; });
      res.locals.settings = s;
      next();
    })
    .catch(() => {
      res.locals.settings = {};
      next();
    });
});

app.use('/', mainRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);

app.use((req, res) => {
  res.status(404).render('pages/404', { title: 'Page Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('pages/500', { title: 'Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

