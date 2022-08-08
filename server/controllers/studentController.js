const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const Student = require('../models/Student');
const User = require('../models/User');
const StudentClass = require('../models/StudentClass');

router.get('/count', async (req, res) => {
    const count = await Student.count();

    if (count) {
        res.status(201).json({ count });
    } else {
        res.status(201).json({ count: 0 });
    }
})

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

    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(password, salt);

    const userStudent = await User.create({
        role,
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });

    const student = await Student.create({
        firstName,
        lastName,
        studentClass,
        userId: userStudent._id,
        grades: {},
    });

    await StudentClass.findOneAndUpdate({ name: studentClass }, { $push: { students: student._id } });

    if (student && userStudent) {
        res.status(201).json({
            _id: userStudent._id,
            email: userStudent.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid student data!');
    }
});

router.put('/:id/add-grade', async (req, res) => {
    const { grade, subject } = req.body
    const student = await Student.findById(req.params.id);

    if (student.grades[subject]) {
        student.grades[subject].push(grade);
    } else {
        student.grades[subject] = [grade];
    }

    // let exist = false;

    // for (let item of student.grades) {
    //     if (item[subject]) {
    //         exist = true;
    //         item[subject].push(grade);
    //     }
    // }

    // const obj = {};

    // if (!exist) {
    //     obj[subject] = [grade];
    //     student.grades.push(obj);
    // }

    const newStudent = await Student.findByIdAndUpdate(req.params.id, student);

    res.status(201).json({ _id: newStudent._id, grades: student.grades[subject] });
});

module.exports = router;