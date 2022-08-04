const express = require('express');
const router = express.Router();

const StudentClass = require('../models/StudentClass');

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
})

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

})

module.exports = router;