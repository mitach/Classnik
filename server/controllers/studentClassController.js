const express = require('express');
const router = express.Router();

const StudentClass = require('../models/StudentClass');
const Student = require('../models/Student');

router.get('/', async (req, res) => {
    const classes = await StudentClass.find();

    if (classes) {
        res.status(201).json({
            classes,
        });
    } else {
        res.status(400);
        throw new Error('Invalid student class data!');
    }
});

router.get('/count', async (req, res) => {
    const count = await StudentClass.count();

    if (count) {
        res.status(201).json({ count });
    } else {
        res.status(201).json({ count: 0 });
    }
});

router.get('/:id', async (req, res) => {
    const studentClass = await StudentClass.findById(req.params.id);
    const studentsArr = [];

    for (let student of studentClass.students) {
        const studentInfo = await Student.findById(student);
        studentsArr.push(studentInfo);
    }

    if (studentsArr.length > 0) {
        res.status(201).json({
            students: studentsArr,
        });
    }
});

router.get('/student-class/:studentClassName', async (req, res) => {
    const studentClass = await StudentClass.findOne({ name: req.params.studentClassName });
    
    if (studentClass) {
        res.status(201).json(studentClass)
    }
});

router.post('/', async (req, res) => {
    const { name } = req.body;

    if (!name) {
        res.status(400);
        throw new Error('Please add all fields!');
    }

    const studentClassExists = await StudentClass.findOne({ name });

    if (studentClassExists) {
        res.status(400);
        throw new Error('Student Class already exists!');
    }

    const studentClass = await StudentClass.create({
        name
    });

    if (studentClass) {
        res.status(201).json({
            _id: studentClass._id,
            name: studentClass.name,
        });
    } else {
        res.status(400);
        throw new Error('Invalid student class data!');
    }
});

router.put('/schedule', async (req, res) => {
    const { studentClassName, monday, tuesday, wednesday, thursday, friday } = req.body;

    const studentClass = await StudentClass.findOne({ name: studentClassName });
    studentClass.schedule = {
        'Monday': monday,
        'Tuesday': tuesday,
        'Wednesday': wednesday,
        'Thursday': thursday,
        'Friday': friday,
    };

    const updatedStudentClass = await StudentClass.findOneAndUpdate({ name: studentClassName }, studentClass);

    res.status(201).json(updatedStudentClass);
});

module.exports = router;