const express = require('express');
const router = express.Router();
const prisma = require('../config/database');

router.get('/projects/software', async (req, res) => {
  try {
    const projects = await prisma.softwareProject.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

router.get('/projects/creative', async (req, res) => {
  try {
    const projects = await prisma.creativeProject.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

router.get('/blog', async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, title: true, slug: true, excerpt: true,
        coverImage: true, category: true, createdAt: true,
        tags: true,
      },
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, projectType, budget, timeline, description } = req.body;
    const message = await prisma.message.create({
      data: { name, email, phone, projectType, budget, timeline, description },
    });
    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;
