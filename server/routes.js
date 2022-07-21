const express = require('express');
const router = express.Router();

// controllers
const authController = require('./controllers/authController');

router.use('/api/auth', authController);

module.exports = router;