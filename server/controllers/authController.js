const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// @desc    Register new user
// @route   POST /api/users
// @access  Public
router.post('/register', async (req, res) => {
    const { role, firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields!');
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400);
        throw new Error('User already exists!')
    }

    // Hash password
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        role,
        firstName,
        lastName,
        email,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data!')
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        res.status(400);
        throw new Error('Please add all fields!');
    }

    // Check for user email
    const user = await User.findOne({ email });
    const validPassword = await bcrypt.compare(password, user.password);

    if (user && validPassword) {
        res.json({
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid credentials!');
    }
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
}


module.exports = router;