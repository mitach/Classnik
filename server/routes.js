const express = require('express');
const router = express.Router();

// controllers
const authController = require('./controllers/authController');
const studentClassController = require('./controllers/studentClassController');
const studentController = require('./controllers/studentController');
const teacherController = require('./controllers/teacherController');

router.use('/api/auth', authController);
router.use('/api/studentclass', studentClassController);
router.use('/api/students', studentController);
router.use('/api/teachers', teacherController);

module.exports = router;