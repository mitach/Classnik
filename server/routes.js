const express = require('express');
const router = express.Router();

// controllers
const authController = require('./controllers/authController');
const studentClassController = require('./controllers/studentClassController');
const studentController = require('./controllers/studentController');

router.use('/api/auth', authController);
router.use('/api/studentclass', studentClassController);
router.use('/api/students', studentController);

module.exports = router;