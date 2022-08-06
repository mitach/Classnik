const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const Student = require('../models/Student');
const User = require('../models/User');
const StudentClass = require('../models/StudentClass');

router.post('/', async (req, res) => {
    const { role, firstName, lastName, studentClass, email, password } = req.body;

    if (!firstName || !lastName || !studentClass) {
        res.status(400);
        throw new Error('Please add all fields!');
    }

    const studentExists = await User.findOne({ email });

    if (studentExists) {
        res.status(400);
        throw new Error('Student already exists!');
    }

    const student = await Student.create({
        firstName,
        lastName,
        studentClass,
    });

    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(password, salt);

    const userStudent = await User.create({
        role,
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });

    await StudentClass.findOneAndUpdate({ name: studentClass }, {$push: {students: student._id}});

    if (student && userStudent) {
        res.status(201).json({
            _id: userStudent._id,
            email: userStudent.email,
            password: userStudent.password,
        });
    } else {
        res.status(400);
        throw new Error('Invalid student data!');
    }
});

module.exports = router;