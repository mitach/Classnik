const express = require('express');
const router = express.Router();

const Grade = require('../models/Grade');
const Student = require('../models/Student');

router.post('/', async (req, res) => {
    const { grade, id, subject } = req.body;

    if (!grade || !id || !subject) {
        res.status(400);
        throw new Error('Please add all fields!');
    }

    const saveGrade = await Grade.create({
        grade,
        studentId: id,
        subject
    });

    const student = await Student.findById(id);

    if (student.grades[subject]) {
        student.grades[subject].push({ grade: saveGrade.grade, _id: saveGrade._id });
    } else {
        student.grades[subject] = [{ grade: saveGrade.grade, _id: saveGrade._id }];
    }

    const newStudent = await Student.findByIdAndUpdate(id, student);

    if (saveGrade && newStudent) {
        res.status(201).json({
            studentId: newStudent._id,
            gradeId: saveGrade._id,
            grade: saveGrade.grade,
            subject: saveGrade.subject,
        });
    } else {
        res.status(400);
        throw new Error('Invalid grade data!')
    }

});

module.exports = router;