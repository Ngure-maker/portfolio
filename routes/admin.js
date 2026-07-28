const express = require('express');
const router = express.Router();
const { requireAuth, requireAdmin } = require('../middleware/auth');
const adminController = require('../controllers/adminController');
const upload = require('../middleware/upload');

router.use(requireAuth, requireAdmin);

router.use((req, res, next) => {
  const orig = res.render.bind(res);
  res.render = function(v, o, cb) {
    o = o || {};
    o.layout = false;
    return orig(v, o, cb);
  };
  next();
});

router.get('/', adminController.dashboard);
router.get('/projects/software', adminController.softwareProjects);
router.get('/projects/software/new', adminController.newSoftwareProject);
router.post('/projects/software', adminController.createSoftwareProject);
router.get('/projects/software/:id/edit', adminController.editSoftwareProject);
router.put('/projects/software/:id', adminController.updateSoftwareProject);
router.delete('/projects/software/:id', adminController.deleteSoftwareProject);

router.get('/projects/creative', adminController.creativeProjects);
router.get('/projects/creative/new', adminController.newCreativeProject);
router.post('/projects/creative', adminController.createCreativeProject);
router.get('/projects/creative/:id/edit', adminController.editCreativeProject);
router.put('/projects/creative/:id', adminController.updateCreativeProject);
router.delete('/projects/creative/:id', adminController.deleteCreativeProject);

router.get('/blog', adminController.blogPosts);
router.get('/blog/new', adminController.newBlogPost);
router.post('/blog', adminController.createBlogPost);
router.get('/blog/:id/edit', adminController.editBlogPost);
router.put('/blog/:id', adminController.updateBlogPost);
router.delete('/blog/:id', adminController.deleteBlogPost);

router.get('/messages', adminController.messages);
router.get('/messages/:id', adminController.messageDetail);
router.delete('/messages/:id', adminController.deleteMessage);

router.get('/testimonials', adminController.testimonials);
router.get('/services', adminController.services);
router.get('/skills', adminController.skills);
router.get('/settings', adminController.settings);
router.put('/settings', adminController.updateSettings);

router.get('/media', adminController.media);
router.post('/media/upload', upload.single('file'), adminController.uploadMedia);
router.post('/media/upload-json', upload.single('file'), adminController.uploadMediaJson);
router.put('/media/:filename', adminController.renameMedia);
router.post('/media/:filename/resize', adminController.resizeMedia);
router.post('/media/:filename/crop', adminController.cropMedia);
router.delete('/media/:filename', adminController.deleteMedia);

module.exports = router;
