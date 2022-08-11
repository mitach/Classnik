const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Parent = require('../models/Parent');
const Student = require('../models/Student');

// @desc    Register new user
// @route   POST /api/users
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { role, firstName, lastName, email, password, studentEmail } = req.body;

        if (!firstName || !lastName || !email || !password) {
            res.status(400);
            throw new Error('Please add all fields!');
        }

        const userExist = await User.findOne({ email });
        const studentEmailExist = await Student.findOne({ email: studentEmail });

        if (userExist) {
            return res.status(201).send({ message: 'Email already taken!' });
        }

        if (!studentEmailExist) {
            return res.status(201).send({ message: 'Student email is not existing!' });
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

        const parent = await Parent.create({
            userId: user._id,
            firstName,
            lastName,
            email,
            studentEmail
        });

        if (user && parent) {
            res.status(201).json({
                role: user.role,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                studentEmail: parent.studentEmail,
                token: generateToken(user._id),
                _id: user._id
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data!')
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal server error!' });
    }

});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400);
            throw new Error('Please add all fields!');
        }

        // Check for user email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(201).send({ message: 'Invalid email or password!' });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(201).send({ message: 'Invalid email or password' });
        }

        res.status(200).json({
            role: user.role,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            _id: user._id,
            token: generateToken(user._id),
        });

    } catch (error) {
        res.status(500).send({ message: 'Internal server error!' });
    }
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
}


module.exports = router;