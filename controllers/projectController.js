const prisma = require('../config/database');

const demoSoftwareProjects = [
  { id: 0, title: 'E-Commerce Platform', slug: 'ecommerce-platform', description: 'A full-featured e-commerce platform built with Next.js, Node.js, and PostgreSQL. Features include real-time inventory management, secure payment processing via Stripe, admin dashboard with analytics, and responsive design.', content: '<h2>Overview</h2><p>A comprehensive e-commerce solution built for a retail client handling thousands of daily transactions.</p><h2>Architecture</h2><p>The application follows a microservices architecture with separate services for inventory, orders, payments, and user management.</p><h2>Key Features</h2><ul><li>Real-time inventory tracking</li><li>Secure payment processing with Stripe</li><li>Admin dashboard with sales analytics</li><li>Responsive design for all devices</li><li>Email notifications and order tracking</li></ul>', category: 'Web App', techStack: 'Next.js, Node.js, PostgreSQL, Stripe, Redis, Docker', features: 'Real-time inventory management\nSecure payment processing\nAdmin analytics dashboard\nResponsive design\nEmail notifications', githubUrl: '#', liveUrl: '#', heroImage: '', screenshots: '', featured: true, published: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 0, title: 'Task Management API', slug: 'task-management-api', description: 'RESTful API for a task management application built with Spring Boot and PostgreSQL. Includes JWT authentication, role-based access control, Swagger documentation, and comprehensive test coverage.', content: '<h2>Overview</h2><p>A production-ready REST API designed for task management with enterprise-grade security and scalability.</p><h2>Architecture</h2><p>Built with Spring Boot following clean architecture principles with layered separation of concerns.</p><h2>Key Features</h2><ul><li>JWT authentication & authorization</li><li>Role-based access control</li><li>Comprehensive Swagger/OpenAPI docs</li><li>Unit & integration tests</li><li>Rate limiting & caching</li></ul>', category: 'API', techStack: 'Spring Boot, PostgreSQL, JWT, Swagger, JUnit, Docker', features: 'JWT authentication\nRole-based access control\nSwagger API documentation\nUnit & integration tests\nRate limiting', githubUrl: '#', liveUrl: '#', heroImage: '', screenshots: '', featured: true, published: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 0, title: 'Real-Time Chat App', slug: 'real-time-chat-app', description: 'Real-time messaging application using Socket.io, React, and Node.js. Supports group chats, file sharing, message persistence with MongoDB, and online status indicators.', content: '<h2>Overview</h2><p>A real-time communication platform built for teams and communities.</p><h2>Architecture</h2><p>Event-driven architecture using WebSocket connections for real-time bidirectional communication.</p><h2>Key Features</h2><ul><li>Real-time messaging via WebSockets</li><li>Group chat & private messaging</li><li>File & image sharing</li><li>Online/offline status</li><li>Message search & history</li></ul>', category: 'Web App', techStack: 'React, Node.js, Socket.io, MongoDB, Redis', features: 'Real-time messaging\nGroup & private chats\nFile sharing\nOnline status\nSearch history', githubUrl: '#', liveUrl: '#', heroImage: '', screenshots: '', featured: true, published: true, createdAt: new Date(), updatedAt: new Date() },
];

const demoCreativeProjects = [
  { id: 0, title: 'Commercial Brand Film', slug: 'commercial-brand-film', description: 'A cinematic brand film for a luxury lifestyle brand. Shot on Sony A7S III with professional lighting and color grading.', content: '<h2>Project Overview</h2><p>A high-end commercial brand film showcasing the elegance and sophistication of a luxury lifestyle brand.</p><h2>Approach</h2><p>We used a combination of cinematic lighting techniques and precise color grading to create a warm, inviting atmosphere that connects with the target audience.</p>', category: 'Commercial', heroVideo: '', heroImage: '', gallery: '', behindScenes: '', equipment: 'Sony A7S III, DJI RS 3, Aputure 600d', clientReview: 'Ngure captured our brand vision perfectly. The final film exceeded our expectations.', clientName: 'James Mwangi', clientRole: 'Marketing Director', featured: true, published: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 0, title: 'Corporate Documentary', slug: 'corporate-documentary', description: 'Documentary-style corporate video highlighting company culture and impact. Aerial footage included.', content: '<h2>Project Overview</h2><p>A heartfelt documentary-style corporate film that tells the story of a company journey and impact.</p><h2>Approach</h2><p>We followed employees across multiple locations, capturing authentic moments and genuine interactions to tell an honest, compelling story.</p>', category: 'Corporate', heroVideo: '', heroImage: '', gallery: '', behindScenes: '', equipment: 'Canon EOS R5, DJI Mavic 3, Rode NTG5', clientReview: 'The documentary perfectly captured our company culture and values.', clientName: 'Sarah Wanjiku', clientRole: 'HR Director', featured: true, published: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 0, title: 'Wedding Cinematic Film', slug: 'wedding-cinematic-film', description: 'Cinematic wedding film combining traditional and documentary-style coverage. Emotional storytelling through visuals.', content: '<h2>Project Overview</h2><p>A cinematic wedding film that tells the love story of a beautiful couple through carefully crafted visuals.</p><h2>Approach</h2><p>We blended traditional ceremony coverage with documentary-style candid moments to create a film that feels both timeless and authentic.</p>', category: 'Wedding', heroVideo: '', heroImage: '', gallery: '', behindScenes: '', equipment: 'Sony A7S III, DJI RS 3, Godox SL60W', clientReview: 'We cry every time we watch our wedding film. Absolutely perfect.', clientName: 'David & Grace', clientRole: 'Clients', featured: true, published: true, createdAt: new Date(), updatedAt: new Date() },
];

exports.softwareProjects = async (req, res) => {
  try {
    const projects = await prisma.softwareProject.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } });
    res.render('pages/software-projects', { title: 'Software Projects - Ngure', projects: projects.length ? projects : demoSoftwareProjects });
  } catch (err) {
    res.render('pages/software-projects', { title: 'Software Projects - Ngure', projects: demoSoftwareProjects });
  }
};

exports.softwareProjectDetail = async (req, res) => {
  try {
    const project = await prisma.softwareProject.findUnique({ where: { slug: req.params.slug } });
    if (project) {
      const related = await prisma.softwareProject.findMany({ where: { published: true, id: { not: project.id }, category: project.category }, take: 3 });
      return res.render('pages/software-project-detail', { title: `${project.title} - Ngure`, project, related });
    }
    const fallback = demoSoftwareProjects.find(p => p.slug === req.params.slug);
    if (fallback) {
      const related = demoSoftwareProjects.filter(p => p.slug !== fallback.slug && p.category === fallback.category);
      return res.render('pages/software-project-detail', { title: `${fallback.title} - Ngure`, project: fallback, related });
    }
    res.status(404).render('pages/404', { title: 'Project Not Found' });
  } catch (err) {
    res.status(404).render('pages/404', { title: 'Project Not Found' });
  }
};

exports.creativeProjects = async (req, res) => {
  try {
    const projects = await prisma.creativeProject.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } });
    res.render('pages/creative-projects', { title: 'Creative Projects - Ngure', projects: projects.length ? projects : demoCreativeProjects });
  } catch (err) {
    res.render('pages/creative-projects', { title: 'Creative Projects - Ngure', projects: demoCreativeProjects });
  }
};

exports.creativeProjectDetail = async (req, res) => {
  try {
    const project = await prisma.creativeProject.findUnique({ where: { slug: req.params.slug } });
    if (project) {
      const related = await prisma.creativeProject.findMany({ where: { published: true, id: { not: project.id }, category: project.category }, take: 3 });
      return res.render('pages/creative-project-detail', { title: `${project.title} - Ngure`, project, related });
    }
    const fallback = demoCreativeProjects.find(p => p.slug === req.params.slug);
    if (fallback) {
      const related = demoCreativeProjects.filter(p => p.slug !== fallback.slug && p.category === fallback.category);
      return res.render('pages/creative-project-detail', { title: `${fallback.title} - Ngure`, project: fallback, related });
    }
    res.status(404).render('pages/404', { title: 'Project Not Found' });
  } catch (err) {
    res.status(404).render('pages/404', { title: 'Project Not Found' });
  }
};

exports.creativeProjectsByCategory = async (req, res) => {
  try {
    const projects = await prisma.creativeProject.findMany({ where: { published: true, category: req.params.category }, orderBy: { createdAt: 'desc' } });
    res.render('pages/creative-projects', { title: `${req.params.category} Projects - Ngure`, projects: projects.length ? projects : demoCreativeProjects.filter(p => p.category === req.params.category), activeCategory: req.params.category });
  } catch (err) {
    res.render('pages/creative-projects', { title: 'Creative Projects - Ngure', projects: demoCreativeProjects, activeCategory: req.params.category });
  }
};
