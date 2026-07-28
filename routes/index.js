const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const projectController = require('../controllers/projectController');
const blogController = require('../controllers/blogController');
const contactController = require('../controllers/contactController');

router.get('/', mainController.home);
router.get('/about', mainController.about);
router.get('/services', mainController.services);
router.get('/service/:slug', mainController.serviceDetail);
router.get('/software', mainController.software);
router.get('/creative', mainController.creative);
router.get('/projects/software', projectController.softwareProjects);
router.get('/projects/software/:slug', projectController.softwareProjectDetail);
router.get('/projects/creative', projectController.creativeProjects);
router.get('/projects/creative/:slug', projectController.creativeProjectDetail);
router.get('/projects/creative/category/:category', projectController.creativeProjectsByCategory);
router.get('/studio', mainController.studio);
router.get('/blog', blogController.index);
router.get('/blog/category/:category', blogController.byCategory);
router.get('/blog/:slug', blogController.show);
router.get('/contact', contactController.show);
router.post('/contact', contactController.submit);

module.exports = router;
