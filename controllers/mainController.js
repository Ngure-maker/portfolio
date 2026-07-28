const prisma = require('../config/database');

const demoFeaturedSoftware = [
  { id: 0, title: 'E-Commerce Platform', slug: 'ecommerce-platform', description: 'A full-featured e-commerce platform built with Next.js, Node.js, and PostgreSQL. Features include real-time inventory, payment processing, and admin dashboard.', category: 'Web App', techStack: 'Next.js, Node.js, PostgreSQL, Stripe', features: '', content: '', heroImage: '', screenshots: '', githubUrl: '#', liveUrl: '#', featured: true, published: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 0, title: 'Task Management API', slug: 'task-management-api', description: 'RESTful API for a task management application built with Spring Boot and PostgreSQL. Includes JWT authentication, role-based access, and Swagger documentation.', category: 'API', techStack: 'Spring Boot, PostgreSQL, JWT, Swagger', features: '', content: '', heroImage: '', screenshots: '', githubUrl: '#', liveUrl: '#', featured: true, published: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 0, title: 'Real-Time Chat App', slug: 'real-time-chat-app', description: 'Real-time messaging application using Socket.io, React, and Node.js. Supports group chats, file sharing, and message persistence with MongoDB.', category: 'Web App', techStack: 'React, Node.js, Socket.io, MongoDB', features: '', content: '', heroImage: '', screenshots: '', githubUrl: '#', liveUrl: '#', featured: true, published: true, createdAt: new Date(), updatedAt: new Date() },
];

const demoFeaturedCreative = [
  { id: 0, title: 'Commercial Brand Film', slug: 'commercial-brand-film', description: 'A cinematic brand film for a luxury lifestyle brand. Shot on Sony A7S III with professional lighting and color grading.', category: 'Commercial', heroVideo: '', heroImage: '', gallery: '', behindScenes: '', equipment: '', clientReview: '', clientName: '', clientRole: '', featured: true, published: true, content: '', createdAt: new Date(), updatedAt: new Date() },
  { id: 0, title: 'Corporate Documentary', slug: 'corporate-documentary', description: 'Documentary-style corporate video highlighting company culture and impact. Aerial footage included.', category: 'Corporate', heroVideo: '', heroImage: '', gallery: '', behindScenes: '', equipment: '', clientReview: '', clientName: '', clientRole: '', featured: true, published: true, content: '', createdAt: new Date(), updatedAt: new Date() },
  { id: 0, title: 'Wedding Cinematic Film', slug: 'wedding-cinematic-film', description: 'Cinematic wedding film combining traditional and documentary-style coverage. Emotional storytelling through visuals.', category: 'Wedding', heroVideo: '', heroImage: '', gallery: '', behindScenes: '', equipment: '', clientReview: '', clientName: '', clientRole: '', featured: true, published: true, content: '', createdAt: new Date(), updatedAt: new Date() },
];

const demoBlogPosts = [
  { id: 0, title: 'Building Scalable REST APIs with Spring Boot', slug: 'building-scalable-rest-apis-spring-boot', excerpt: 'Learn how to architect and build production-ready REST APIs using Spring Boot, JPA, and PostgreSQL with clean architecture principles.', coverImage: '', category: 'Software Engineering', tags: 'spring-boot, java, api, backend', published: true, featured: true, content: '', createdAt: new Date(), updatedAt: new Date() },
  { id: 0, title: 'Cinematic Color Grading in DaVinci Resolve', slug: 'cinematic-color-grading-davinci-resolve', excerpt: 'A comprehensive guide to achieving cinematic color grades using DaVinci Resolve. From primary correction to creative grading.', coverImage: '', category: 'Editing', tags: 'color-grading, davinci-resolve, video-editing', published: true, featured: true, content: '', createdAt: new Date(), updatedAt: new Date() },
  { id: 0, title: 'From Developer to Filmmaker: My Dual Career Journey', slug: 'from-developer-to-filmmaker-dual-career', excerpt: 'How I balance being a full-stack software engineer and a cinematographer. Lessons learned from working in two creative disciplines.', coverImage: '', category: 'Software Engineering', tags: 'career, creativity, productivity', published: true, featured: true, content: '', createdAt: new Date(), updatedAt: new Date() },
];

exports.home = async (req, res) => {
  try {
    const [featuredSoftware, featuredCreative, testimonials, blogPosts] = await Promise.all([
      prisma.softwareProject.findMany({ where: { featured: true, published: true }, take: 3, orderBy: { createdAt: 'desc' } }),
      prisma.creativeProject.findMany({ where: { featured: true, published: true }, take: 3, orderBy: { createdAt: 'desc' } }),
      prisma.testimonial.findMany({ where: { featured: true }, take: 3 }),
      prisma.blogPost.findMany({ where: { published: true }, take: 3, orderBy: { createdAt: 'desc' } }),
    ]);

    res.render('pages/home', {
      title: 'Ngure - Full Stack Engineer & Visual Storyteller',
      featuredSoftware: featuredSoftware.length ? featuredSoftware : demoFeaturedSoftware,
      featuredCreative: featuredCreative.length ? featuredCreative : demoFeaturedCreative,
      testimonials,
      blogPosts: blogPosts.length ? blogPosts : demoBlogPosts,
      stats: { projectsCompleted: 50, clients: 30, yearsExperience: 4, videosProduced: 200 },
    });
  } catch (err) {
    console.error('Home error:', err);
    res.render('pages/home', {
      title: 'Ngure - Full Stack Engineer & Visual Storyteller',
      featuredSoftware: demoFeaturedSoftware,
      featuredCreative: demoFeaturedCreative,
      testimonials: [],
      blogPosts: demoBlogPosts,
      stats: { projectsCompleted: 50, clients: 30, yearsExperience: 4, videosProduced: 200 },
    });
  }
};

exports.about = async (req, res) => {
  try {
    const [skills, testimonials] = await Promise.all([
      prisma.skill.findMany({ orderBy: { order: 'asc' } }),
      prisma.testimonial.findMany({ where: { featured: true } }),
    ]);
    if (!skills.length) {
      const demoSkills = [
        { id: 0, name: 'Java', level: 95, category: 'backend', order: 1 },
        { id: 0, name: 'JavaScript', level: 95, category: 'frontend', order: 2 },
        { id: 0, name: 'TypeScript', level: 90, category: 'frontend', order: 3 },
        { id: 0, name: 'Python', level: 85, category: 'backend', order: 4 },
        { id: 0, name: 'React / Next.js', level: 90, category: 'framework', order: 5 },
        { id: 0, name: 'Node.js / Express', level: 95, category: 'framework', order: 6 },
        { id: 0, name: 'Spring Boot', level: 90, category: 'framework', order: 7 },
        { id: 0, name: 'PostgreSQL / MySQL', level: 90, category: 'database', order: 8 },
        { id: 0, name: 'MongoDB', level: 80, category: 'database', order: 9 },
        { id: 0, name: 'Docker / Cloud', level: 85, category: 'devops', order: 10 },
        { id: 0, name: 'Flutter', level: 75, category: 'framework', order: 11 },
        { id: 0, name: 'Git / CI/CD', level: 90, category: 'devops', order: 12 },
      ];
      return res.render('pages/about', { title: 'About - Ngure', skills: demoSkills, testimonials });
    }
    res.render('pages/about', { title: 'About - Ngure', skills, testimonials });
  } catch (err) {
    console.error('About error:', err);
    res.render('pages/about', { title: 'About - Ngure', skills: [], testimonials: [] });
  }
};

exports.services = async (req, res) => {
  try {
    const services = await prisma.service.findMany({ where: { published: true }, orderBy: { order: 'asc' } });
    if (!services.length) {
      return res.render('pages/services', {
        title: 'Services - Ngure',
        softwareServices: [
          { title: 'Full Stack Development', slug: 'full-stack', description: 'Complete web application development using modern frameworks like React, Next.js, Node.js, and Spring Boot.', icon: 'fa-layer-group', category: 'software', order: 1 },
          { title: 'Frontend Development', slug: 'frontend', description: 'Responsive, accessible, and performant user interfaces built with React, Next.js, TypeScript, and vanilla JavaScript.', icon: 'fa-code', category: 'software', order: 2 },
          { title: 'Backend Development', slug: 'backend', description: 'Scalable server-side applications, RESTful APIs, and microservices using Node.js, Express, Spring Boot, and Laravel.', icon: 'fa-server', category: 'software', order: 3 },
          { title: 'REST API Development', slug: 'rest-api', description: 'Well-documented, secure, and performant RESTful APIs following industry standards and best practices.', icon: 'fa-plug', category: 'software', order: 4 },
          { title: 'Database Design', slug: 'database', description: 'Relational and NoSQL database architecture, optimization, and management using PostgreSQL, MySQL, MongoDB, and SQLite.', icon: 'fa-database', category: 'software', order: 5 },
          { title: 'Cloud Deployment', slug: 'cloud', description: 'CI/CD pipeline setup, cloud infrastructure management on AWS, Google Cloud, Railway, and Render.', icon: 'fa-cloud', category: 'software', order: 6 },
        ],
        creativeServices: [
          { title: 'Cinematography', slug: 'cinematography', description: 'Professional cinematography for films, commercials, documentaries, and music videos.', icon: 'fa-video', category: 'creative', order: 7 },
          { title: 'Videography', slug: 'videography', description: 'Event coverage, corporate videos, wedding films, and social media content.', icon: 'fa-camera-retro', category: 'creative', order: 8 },
          { title: 'Photography', slug: 'photography', description: 'Portrait, event, commercial, and editorial photography.', icon: 'fa-camera', category: 'creative', order: 9 },
          { title: 'Video Editing', slug: 'video-editing', description: 'Professional post-production, color grading, sound design, and motion graphics.', icon: 'fa-cut', category: 'creative', order: 10 },
          { title: 'Color Grading', slug: 'color-grading', description: 'Professional color grading to achieve cinematic looks and consistent visual aesthetics.', icon: 'fa-palette', category: 'creative', order: 11 },
          { title: 'Drone Videography', slug: 'drone', description: 'Aerial cinematography and photography using professional drones.', icon: 'fa-helicopter', category: 'creative', order: 12 },
        ],
      });
    }
    const softwareServices = services.filter(s => s.category === 'software');
    const creativeServices = services.filter(s => s.category === 'creative');
    res.render('pages/services', { title: 'Services - Ngure', softwareServices, creativeServices });
  } catch (err) {
    res.render('pages/services', { title: 'Services - Ngure', softwareServices: [], creativeServices: [] });
  }
};

exports.serviceDetail = async (req, res) => {
  try {
    const service = await prisma.service.findUnique({ where: { slug: req.params.slug } });
    if (!service) return res.status(404).render('pages/404', { title: 'Service Not Found' });
    res.render('pages/service-detail', { title: `${service.title} - Ngure`, service });
  } catch (err) {
    res.status(404).render('pages/404', { title: 'Service Not Found' });
  }
};

exports.software = async (req, res) => {
  try {
    const projects = await prisma.softwareProject.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } });
    res.render('pages/software', { title: 'Software Engineering - Ngure', projects: projects.length ? projects : demoFeaturedSoftware });
  } catch (err) {
    res.render('pages/software', { title: 'Software Engineering - Ngure', projects: demoFeaturedSoftware });
  }
};

exports.creative = async (req, res) => {
  try {
    const projects = await prisma.creativeProject.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } });
    res.render('pages/creative', { title: 'Creative - Ngure', projects: projects.length ? projects : demoFeaturedCreative });
  } catch (err) {
    res.render('pages/creative', { title: 'Creative - Ngure', projects: demoFeaturedCreative });
  }
};

exports.studio = (req, res) => {
  res.render('pages/studio', { title: 'Studio - Ngure' });
};
