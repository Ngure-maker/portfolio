const prisma = require('../config/database');
const slugify = require('slugify');

exports.dashboard = async (req, res) => {
  try {
    const stats = {
      softwareProjects: await prisma.softwareProject.count(),
      creativeProjects: await prisma.creativeProject.count(),
      blogPosts: await prisma.blogPost.count(),
      messages: await prisma.message.count(),
      unreadMessages: await prisma.message.count({ where: { read: false } }),
    };
    const recentMessages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    });
    res.render('pages/admin/dashboard', {
      title: 'Admin Dashboard - Ngure',
      stats,
      recentMessages,
    });
  } catch (err) {
    res.render('pages/admin/dashboard', {
      title: 'Admin Dashboard - Ngure',
      stats: {},
      recentMessages: [],
    });
  }
};

exports.softwareProjects = async (req, res) => {
  const projects = await prisma.softwareProject.findMany({ orderBy: { createdAt: 'desc' } });
  res.render('pages/admin/software-projects', { title: 'Software Projects - Admin', projects });
};

exports.newSoftwareProject = (req, res) => {
  const fs = require('fs');
  const path = require('path');
  const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
  const mediaFiles = fs.existsSync(uploadsDir)
    ? fs.readdirSync(uploadsDir).filter(f => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f))
    : [];
  res.render('pages/admin/software-project-form', { title: 'New Software Project', project: null, mediaFiles });
};

exports.createSoftwareProject = async (req, res) => {
  try {
    const data = {
      ...req.body,
      slug: slugify(req.body.title, { lower: true }),
      featured: req.body.featured === 'true',
      published: req.body.published === 'true',
    };
    await prisma.softwareProject.create({ data });
    req.flash('success', 'Project created successfully');
    res.redirect('/admin/projects/software');
  } catch (err) {
    console.error('Create software project error:', err.message);
    req.flash('error', 'Error creating project: ' + err.message);
    res.redirect('/admin/projects/software/new');
  }
};

exports.editSoftwareProject = async (req, res) => {
  const project = await prisma.softwareProject.findUnique({ where: { id: parseInt(req.params.id) } });
  if (!project) return res.redirect('/admin/projects/software');
  const fs = require('fs');
  const path = require('path');
  const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
  const mediaFiles = fs.existsSync(uploadsDir)
    ? fs.readdirSync(uploadsDir).filter(f => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f))
    : [];
  res.render('pages/admin/software-project-form', { title: 'Edit Software Project', project, mediaFiles });
};

exports.updateSoftwareProject = async (req, res) => {
  try {
    const data = {
      ...req.body,
      slug: slugify(req.body.title, { lower: true }),
      featured: req.body.featured === 'true',
      published: req.body.published === 'true',
    };
    await prisma.softwareProject.update({ where: { id: parseInt(req.params.id) }, data });
    req.flash('success', 'Project updated successfully');
    res.redirect('/admin/projects/software');
  } catch (err) {
    console.error('Update software project error:', err.message);
    req.flash('error', 'Error updating project: ' + err.message);
    res.redirect(`/admin/projects/software/${req.params.id}/edit`);
  }
};

exports.deleteSoftwareProject = async (req, res) => {
  await prisma.softwareProject.delete({ where: { id: parseInt(req.params.id) } });
  req.flash('success', 'Project deleted');
  res.redirect('/admin/projects/software');
};

exports.creativeProjects = async (req, res) => {
  const projects = await prisma.creativeProject.findMany({ orderBy: { createdAt: 'desc' } });
  res.render('pages/admin/creative-projects', { title: 'Creative Projects - Admin', projects });
};

exports.newCreativeProject = (req, res) => {
  const fs = require('fs');
  const path = require('path');
  const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
  const mediaFiles = fs.existsSync(uploadsDir)
    ? fs.readdirSync(uploadsDir).filter(f => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f))
    : [];
  res.render('pages/admin/creative-project-form', { title: 'New Creative Project', project: null, mediaFiles });
};

exports.createCreativeProject = async (req, res) => {
  try {
    const data = {
      ...req.body,
      slug: slugify(req.body.title, { lower: true }),
      featured: req.body.featured === 'true',
      published: req.body.published === 'true',
    };
    await prisma.creativeProject.create({ data });
    req.flash('success', 'Project created successfully');
    res.redirect('/admin/projects/creative');
  } catch (err) {
    console.error('Create creative project error:', err.message);
    req.flash('error', 'Error creating project: ' + err.message);
    res.redirect('/admin/projects/creative/new');
  }
};

exports.editCreativeProject = async (req, res) => {
  const project = await prisma.creativeProject.findUnique({ where: { id: parseInt(req.params.id) } });
  if (!project) return res.redirect('/admin/projects/creative');
  const fs = require('fs');
  const path = require('path');
  const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
  const mediaFiles = fs.existsSync(uploadsDir)
    ? fs.readdirSync(uploadsDir).filter(f => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f))
    : [];
  res.render('pages/admin/creative-project-form', { title: 'Edit Creative Project', project, mediaFiles });
};

exports.updateCreativeProject = async (req, res) => {
  try {
    const data = {
      ...req.body,
      slug: slugify(req.body.title, { lower: true }),
      featured: req.body.featured === 'true',
      published: req.body.published === 'true',
    };
    await prisma.creativeProject.update({ where: { id: parseInt(req.params.id) }, data });
    req.flash('success', 'Project updated successfully');
    res.redirect('/admin/projects/creative');
  } catch (err) {
    req.flash('error', 'Error updating project');
    res.redirect(`/admin/projects/creative/${req.params.id}/edit`);
  }
};

exports.deleteCreativeProject = async (req, res) => {
  await prisma.creativeProject.delete({ where: { id: parseInt(req.params.id) } });
  req.flash('success', 'Project deleted');
  res.redirect('/admin/projects/creative');
};

exports.blogPosts = async (req, res) => {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
  res.render('pages/admin/blog-posts', { title: 'Blog Posts - Admin', posts });
};

exports.newBlogPost = (req, res) => {
  res.render('pages/admin/blog-post-form', { title: 'New Blog Post', post: null });
};

exports.createBlogPost = async (req, res) => {
  try {
    const data = { ...req.body, slug: slugify(req.body.title, { lower: true }) };
    await prisma.blogPost.create({ data });
    req.flash('success', 'Post created successfully');
    res.redirect('/admin/blog');
  } catch (err) {
    req.flash('error', 'Error creating post');
    res.redirect('/admin/blog/new');
  }
};

exports.editBlogPost = async (req, res) => {
  const post = await prisma.blogPost.findUnique({ where: { id: parseInt(req.params.id) } });
  if (!post) return res.redirect('/admin/blog');
  res.render('pages/admin/blog-post-form', { title: 'Edit Blog Post', post });
};

exports.updateBlogPost = async (req, res) => {
  try {
    const data = { ...req.body, slug: slugify(req.body.title, { lower: true }) };
    await prisma.blogPost.update({ where: { id: parseInt(req.params.id) }, data });
    req.flash('success', 'Post updated successfully');
    res.redirect('/admin/blog');
  } catch (err) {
    req.flash('error', 'Error updating post');
    res.redirect(`/admin/blog/${req.params.id}/edit`);
  }
};

exports.deleteBlogPost = async (req, res) => {
  await prisma.blogPost.delete({ where: { id: parseInt(req.params.id) } });
  req.flash('success', 'Post deleted');
  res.redirect('/admin/blog');
};

exports.messages = async (req, res) => {
  const messages = await prisma.message.findMany({ orderBy: { createdAt: 'desc' } });
  res.render('pages/admin/messages', { title: 'Messages - Admin', messages });
};

exports.messageDetail = async (req, res) => {
  const message = await prisma.message.findUnique({ where: { id: parseInt(req.params.id) } });
  if (!message) return res.redirect('/admin/messages');
  if (!message.read) {
    await prisma.message.update({ where: { id: message.id }, data: { read: true } });
  }
  res.render('pages/admin/message-detail', { title: 'Message - Admin', message });
};

exports.deleteMessage = async (req, res) => {
  await prisma.message.delete({ where: { id: parseInt(req.params.id) } });
  req.flash('success', 'Message deleted');
  res.redirect('/admin/messages');
};

exports.testimonials = async (req, res) => {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } });
  res.render('pages/admin/testimonials', { title: 'Testimonials - Admin', testimonials });
};

exports.services = async (req, res) => {
  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });
  res.render('pages/admin/services', { title: 'Services - Admin', services });
};

exports.skills = async (req, res) => {
  const skills = await prisma.skill.findMany({ orderBy: { order: 'asc' } });
  res.render('pages/admin/skills', { title: 'Skills - Admin', skills });
};

exports.settings = async (req, res) => {
  const settings = await prisma.setting.findMany();
  const fs = require('fs');
  const path = require('path');
  const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
  const files = fs.existsSync(uploadsDir)
    ? fs.readdirSync(uploadsDir).filter(f => /\.(jpg|jpeg|png|gif|webp|svg|mp4|webm)$/i.test(f))
    : [];
  res.render('pages/admin/settings', { title: 'Settings - Admin', settings, mediaFiles: files });
};

exports.updateSettings = async (req, res) => {
  try {
    for (const [key, value] of Object.entries(req.body)) {
      await prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }
    req.flash('success', 'Settings updated');
    res.redirect('/admin/settings');
  } catch (err) {
    req.flash('error', 'Error updating settings');
    res.redirect('/admin/settings');
  }
};

exports.media = async (req, res) => {
  const fs = require('fs');
  const path = require('path');
  const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
  const files = fs.readdirSync(uploadsDir).filter(f => /\.(jpg|jpeg|png|gif|webp|svg|mp4|webm)$/i.test(f));
  res.render('pages/admin/media', { title: 'Media - Admin', files });
};

exports.uploadMedia = async (req, res) => {
  if (!req.file) {
    req.flash('error', 'No file uploaded');
    return res.redirect('/admin/media');
  }
  req.flash('success', 'File uploaded: ' + req.file.filename);
  res.redirect('/admin/media');
};

exports.uploadMediaJson = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ url: '/uploads/' + req.file.filename });
};

exports.cropMedia = async (req, res) => {
  const fs = require('fs');
  const path = require('path');
  const sharp = require('sharp');
  const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
  const filePath = path.join(uploadsDir, req.params.filename);
  const x = parseInt(req.body.x, 10);
  const y = parseInt(req.body.y, 10);
  const w = parseInt(req.body.w, 10);
  const h = parseInt(req.body.h, 10);

  if (!fs.existsSync(filePath)) {
    req.flash('error', 'File not found');
    return res.redirect('/admin/media');
  }

  if (isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h) || w < 1 || h < 1) {
    req.flash('error', 'Invalid crop coordinates');
    return res.redirect('/admin/media');
  }

  try {
    const minSize = 480;
    const resizeW = w < minSize ? minSize : w;
    const resizeH = h < minSize ? minSize : h;
    let pipeline = sharp(filePath).extract({ left: x, top: y, width: w, height: h });
    if (w < minSize || h < minSize) {
      pipeline = pipeline.resize(resizeW, resizeH, { fit: 'cover', withoutEnlargement: false });
    }
    const buffer = await pipeline.toBuffer();
    fs.writeFileSync(filePath, buffer);
    req.flash('success', 'Image cropped to ' + (w < minSize || h < minSize ? resizeW + 'x' + resizeH : w + 'x' + h));
  } catch (err) {
    req.flash('error', 'Error cropping image');
  }
  res.redirect('/admin/media');
};

exports.resizeMedia = async (req, res) => {
  const fs = require('fs');
  const path = require('path');
  const sharp = require('sharp');
  const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
  const filePath = path.join(uploadsDir, req.params.filename);
  const width = parseInt(req.body.width, 10);
  const height = parseInt(req.body.height, 10);

  if (!fs.existsSync(filePath)) {
    req.flash('error', 'File not found');
    return res.redirect('/admin/media');
  }

  if (!width || !height || width < 1 || height < 1 || width > 10000 || height > 10000) {
    req.flash('error', 'Enter valid dimensions (1-10000)');
    return res.redirect('/admin/media');
  }

  try {
    const metadata = await sharp(filePath).metadata();
    const maxW = metadata.width || width;
    const maxH = metadata.height || height;
    const finalW = Math.min(width, maxW);
    const finalH = Math.min(height, maxH);
    if (finalW < width || finalH < height) {
      req.flash('error', 'Cannot enlarge image. Max size is ' + maxW + 'x' + maxH);
      return res.redirect('/admin/media');
    }
    const buffer = await sharp(filePath)
      .resize(finalW, finalH, { fit: 'cover', position: 'centre' })
      .toBuffer();
    fs.writeFileSync(filePath, buffer);
    req.flash('success', 'Resized to ' + finalW + 'x' + finalH);
  } catch (err) {
    req.flash('error', 'Error resizing image');
  }
  res.redirect('/admin/media');
};

exports.renameMedia = async (req, res) => {
  const fs = require('fs');
  const path = require('path');
  const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
  const oldFile = req.params.filename;
  const newName = req.body.name ? req.body.name.trim() : '';

  if (!newName) {
    req.flash('error', 'New filename is required');
    return res.redirect('/admin/media');
  }

  const ext = path.extname(oldFile);
  const newFilename = newName.endsWith(ext) ? newName : newName + ext;

  if (!/^[a-zA-Z0-9._-]+$/.test(path.basename(newFilename, ext))) {
    req.flash('error', 'Filename can only contain letters, numbers, dots, hyphens, and underscores');
    return res.redirect('/admin/media');
  }

  const oldPath = path.join(uploadsDir, oldFile);
  const newPath = path.join(uploadsDir, newFilename);

  if (!fs.existsSync(oldPath)) {
    req.flash('error', 'File not found');
    return res.redirect('/admin/media');
  }

  if (fs.existsSync(newPath)) {
    req.flash('error', 'A file with that name already exists');
    return res.redirect('/admin/media');
  }

  try {
    fs.renameSync(oldPath, newPath);
    const oldUrl = '/uploads/' + oldFile;
    const newUrl = '/uploads/' + newFilename;
    const allSettings = await prisma.setting.findMany({ where: { value: { contains: oldUrl } } });
    for (const setting of allSettings) {
      const updated = setting.value.replace(oldUrl, newUrl);
      await prisma.setting.update({ where: { id: setting.id }, data: { value: updated } });
    }
    const updatedCount = allSettings.length;
    req.flash('success', 'File renamed to ' + newFilename + (updatedCount ? '. Updated ' + updatedCount + ' setting(s).' : ''));
  } catch (err) {
    req.flash('error', 'Error renaming file');
  }
  res.redirect('/admin/media');
};

exports.deleteMedia = async (req, res) => {
  const fs = require('fs');
  const path = require('path');
  const filePath = path.join(__dirname, '..', 'public', 'uploads', req.params.filename);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  req.flash('success', 'File deleted');
  res.redirect('/admin/media');
};
