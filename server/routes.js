const express = require('express');
const router = express.Router();

// controllers
const authController = require('./controllers/authController');
const studentClassController = require('./controllers/studentClassController');
const studentController = require('./controllers/studentController');
const teacherController = require('./controllers/teacherController');
const gradeController = require('./controllers/gradeController');
const contactsController = require('./controllers/contactsController');

router.use('/api/auth', authController);
router.use('/api/studentclass', studentClassController);
router.use('/api/students', studentController);
router.use('/api/teachers', teacherController);
router.use('/api/grades', gradeController);
router.use('/api/contacts', contactsController);

module.exports = router;