const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const User = require('../models/User');
const Teacher = require('../models/Teacher');

router.get('/', async (req, res) => {
    const teachers = await Teacher.find();
    
    if (teachers) {
        res.status(201).json({ teachers });
    }
});

router.get('/count', async (req, res) => {
    const count = await Teacher.count();
    if (count) {
        res.status(201).json({ count });
    } else {
        res.status(201).json({ count: 0 });
    }
});

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

    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(password, salt);

    const userTeacher = await User.create({
        role,
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });

    const teacher = await Teacher.create({
        firstName,
        lastName,
        subject,
        userId: userTeacher._id,
    });

    if (teacher && userTeacher) {
        res.status(201).json({
            _id: teacher._id,
            firstName: teacher.firstName,
            lastName: teacher.lastName,
            subject: teacher.subject,
        });
    } else {
        res.status(400);
        throw new Error('Invalid teacher data!');
    }
});

router.delete('/:id', async (req, res) => {
    const teacher = await Teacher.findById(req.params.id);
    await User.findByIdAndDelete(teacher.userId);
    await Teacher.findByIdAndDelete(req.params.id);

    res.status(201).json({id: req.params.id});
});

module.exports = router;