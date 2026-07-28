const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 12);

  await prisma.user.upsert({
    where: { email: 'admin@ngure.dev' },
    update: {},
    create: {
      email: 'admin@ngure.dev',
      password: adminPassword,
      name: 'Ngure',
      role: 'admin',
    },
  });

  const softwareServices = [
    { title: 'Full Stack Development', slug: 'full-stack-development', description: 'Complete web application development using modern frameworks like React, Next.js, Node.js, and Spring Boot. From database design to deployment.', icon: 'fa-layer-group', category: 'software', order: 1, content: '<p>I build complete web applications from concept to deployment. Using modern frameworks and best practices, I deliver scalable, maintainable solutions.</p>' },
    { title: 'Frontend Development', slug: 'frontend-development', description: 'Responsive, accessible, and performant user interfaces built with React, Next.js, TypeScript, and vanilla JavaScript with premium animations.', icon: 'fa-code', category: 'software', order: 2, content: '<p>Creating beautiful, responsive user interfaces that provide exceptional user experiences. I specialize in modern JavaScript frameworks.</p>' },
    { title: 'Backend Development', slug: 'backend-development', description: 'Scalable server-side applications, RESTful APIs, and microservices using Node.js, Express, Spring Boot, and Laravel with clean architecture.', icon: 'fa-server', category: 'software', order: 3, content: '<p>Building robust backend systems that power your applications. I design and implement scalable APIs and microservices architectures.</p>' },
    { title: 'REST API Development', slug: 'rest-api-development', description: 'Well-documented, secure, and performant RESTful APIs following industry standards and best practices.', icon: 'fa-plug', category: 'software', order: 4, content: '<p>Designing and implementing RESTful APIs that are secure, well-documented, and performant. Following OpenAPI standards.</p>' },
    { title: 'Database Design', slug: 'database-design', description: 'Relational and NoSQL database architecture, optimization, and management using PostgreSQL, MySQL, MongoDB, and SQLite.', icon: 'fa-database', category: 'software', order: 5, content: '<p>Designing efficient database schemas and optimizing queries for performance. Experience with both SQL and NoSQL databases.</p>' },
    { title: 'Cloud Deployment', slug: 'cloud-deployment', description: 'CI/CD pipeline setup, cloud infrastructure management on AWS, Google Cloud, Railway, and Render. Docker containerization.', icon: 'fa-cloud', category: 'software', order: 6, content: '<p>Deploying and managing applications in the cloud. Setting up CI/CD pipelines, containerization with Docker, and cloud infrastructure.</p>' },
  ];

  const creativeServices = [
    { title: 'Cinematography', slug: 'cinematography', description: 'Professional cinematography for films, commercials, documentaries, and music videos using industry-standard cameras and techniques.', icon: 'fa-video', category: 'creative', order: 7, content: '<p>Cinematic footage crafted with professional-grade equipment and techniques. Every shot is composed with intent and artistic vision.</p>' },
    { title: 'Videography', slug: 'videography', description: 'Event coverage, corporate videos, wedding films, and social media content with cinematic quality and storytelling.', icon: 'fa-camera-retro', category: 'creative', order: 8, content: '<p>Capturing life\'s moments with cinematic quality. From corporate events to weddings, every video tells a compelling story.</p>' },
    { title: 'Photography', slug: 'photography', description: 'Portrait, event, commercial, and editorial photography with professional lighting and composition.', icon: 'fa-camera', category: 'creative', order: 9, content: '<p>Professional photography services with attention to lighting, composition, and post-processing. Every image tells a story.</p>' },
    { title: 'Video Editing', slug: 'video-editing', description: 'Professional post-production, including editing, color grading, sound design, and motion graphics.', icon: 'fa-cut', category: 'creative', order: 10, content: '<p>Transforming raw footage into polished productions. Expert editing, color grading, and sound design for professional results.</p>' },
    { title: 'Color Grading', slug: 'color-grading', description: 'Professional color grading and color correction to achieve cinematic looks and consistent visual aesthetics.', icon: 'fa-palette', category: 'creative', order: 11, content: '<p>Color grading that elevates your visual content. Creating cinematic looks and maintaining consistent visual aesthetics throughout your project.</p>' },
    { title: 'Drone Videography', slug: 'drone-videography', description: 'Aerial cinematography and photography using professional drones for stunning landscape, real estate, and event coverage.', icon: 'fa-helicopter', category: 'creative', order: 12, content: '<p>Stunning aerial footage captured with professional drone equipment. Unique perspectives for your projects from above.</p>' },
  ];

  for (const service of softwareServices) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    });
  }

  for (const service of creativeServices) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    });
  }

  const skills = [
    { name: 'Java', level: 95, category: 'backend', order: 1 },
    { name: 'JavaScript', level: 95, category: 'frontend', order: 2 },
    { name: 'TypeScript', level: 90, category: 'frontend', order: 3 },
    { name: 'PHP', level: 80, category: 'backend', order: 4 },
    { name: 'Python', level: 85, category: 'backend', order: 5 },
    { name: 'C#', level: 75, category: 'backend', order: 6 },
    { name: 'Spring Boot', level: 90, category: 'framework', order: 7 },
    { name: 'Node.js', level: 95, category: 'framework', order: 8 },
    { name: 'Express', level: 95, category: 'framework', order: 9 },
    { name: 'Laravel', level: 80, category: 'framework', order: 10 },
    { name: 'React', level: 90, category: 'framework', order: 11 },
    { name: 'Next.js', level: 90, category: 'framework', order: 12 },
    { name: 'Flutter', level: 75, category: 'framework', order: 13 },
    { name: 'PostgreSQL', level: 90, category: 'database', order: 14 },
    { name: 'MySQL', level: 85, category: 'database', order: 15 },
    { name: 'MongoDB', level: 80, category: 'database', order: 16 },
    { name: 'SQLite', level: 80, category: 'database', order: 17 },
    { name: 'Docker', level: 85, category: 'devops', order: 18 },
    { name: 'Git', level: 90, category: 'devops', order: 19 },
    { name: 'AWS', level: 80, category: 'devops', order: 20 },
  ];

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { id: skill.order },
      update: {},
      create: skill,
    });
  }

  const testimonialData = [
    { name: 'James Ochieng', role: 'CTO', company: 'TechCorp Africa', content: 'Ngure delivered an exceptional full-stack application that exceeded our expectations. His technical expertise and attention to detail are outstanding.', rating: 5, featured: true },
    { name: 'Sarah Wanjiku', role: 'Creative Director', company: 'Pixel Studios', content: 'Working with Ngure on our commercial shoot was incredible. His cinematic eye and technical skills made the final product truly outstanding.', rating: 5, featured: true },
    { name: 'Michael Kimani', role: 'CEO', company: 'StartupHub', content: 'Ngure built our entire platform from scratch. The architecture is solid, the code is clean, and the performance is excellent. Highly recommended.', rating: 5, featured: true },
  ];

  for (const t of testimonialData) {
    await prisma.testimonial.create({ data: t });
  }

  console.log('Seed data created successfully!');
  console.log('Admin login: admin@ngure.dev / admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
