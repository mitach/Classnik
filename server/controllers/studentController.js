const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const Student = require('../models/Student');
const User = require('../models/User');
const StudentClass = require('../models/StudentClass');

router.get('/', async (req, res) => {
    const pageSize = Number(req.query.pagesize);
    const currPage = Number(req.query.page);

    const students = await Student.find().skip(pageSize * (currPage - 1)).limit(pageSize);

    res.status(201).json(students);
});

router.get('/count', async (req, res) => {
    const count = await Student.count();

    if (count) {
        res.status(201).json({ count });
    } else {
        res.status(201).json({ count: 0 });
    }
});

router.get('/:id', async (req, res) => {
    const student = await Student.findOne({ userId: req.params.id });
    
    if (student) {
        res.status(201).json(student);
    } else {
        res.status(400);
        throw new Error('Invalid student data!');
    }
});

router.get('/byemail/:email', async (req, res) => {
    const student = await Student.findOne({ email: req.params.email});
    
    if (student) {
        res.status(201).json(student);
    } else {
        res.status(400);
        throw new Error('Invalid student data!');
    }
});

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
        email,
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

router.delete('/:studentId', async (req, res) => {
    const student = await Student.findById(req.params.studentId);
    const studentClass = await StudentClass.findOne({ name: student.studentClass });
    studentClass.students = studentClass.students.filter(x => x.toString() !== student._id.toString());
    await StudentClass.findOneAndUpdate({ name: student.studentClass }, studentClass);
    await User.findByIdAndDelete(student.userId);
    await Student.findByIdAndDelete(req.params.studentId);

    res.status(201).json({ id: req.params.studentId });
});

module.exports = router;