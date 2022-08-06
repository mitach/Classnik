const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const User = require('../models/User');
const Teacher = require('../models/Teacher');

router.post('/', async (req, res) => {
    const { firstName, lastName, role, subject, email, password } = req.body;

    if (!firstName || !lastName || !subject) {
        res.status(400);
        throw new Error('Please enter all fields!')
    }

    const teacherExists = await User.findOne({ email });

    if (teacherExists) {
        res.status(400);
        throw new Error('Student already exists!');
    }

    const teacher = await Teacher.create({
        firstName,
        lastName,
        subject
    });

    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(password, salt);

    const userTeacher = await User.create({
        role,
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });

    if (teacher && userTeacher) {
        res.status(201).json({
            _id: userTeacher._id,
            email: userTeacher.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid teacher data!');
    }

});

module.exports = router;