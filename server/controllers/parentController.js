const express = require('express');
const router = express.Router();

const Parent = require('../models/Parent');
const Student = require('../models/Student');

router.get('/count', async (req, res) => {
    const count = await Parent.count();

    if (count) {
        res.status(201).json({ count });
    } else {
        res.status(201).json({ count: 0 });
    }
});

router.get('/:userId', async (req, res) => {
    const parent = await Parent.findOne({ userId: req.params.userId });
    if (parent) {
        res.status(201).json(parent);
    } else {
        res.status(400);
        throw new Error('Invalid parent data!');
    }
});

router.get('/studentof/:userId', async (req, res) => {
    const parent = await Parent.findOne({ userId: req.params.userId });
    const student = await Student.findOne({ email: parent.studentEmail });
    
    if (student) {
        res.status(201).json(student);
    } else {
        res.status(400);
        throw new Error('Invalid student data!');
    }
});

module.exports = router;