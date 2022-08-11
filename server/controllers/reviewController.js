const express = require('express');
const router = express.Router();

const Review = require('../models/Review');
const Student = require('../models/Student');

router.get('/student/:userId', async (req, res) => {
    const student = await Student.findOne({ userId: req.params.userId }) || await Student.findOne({ _id: req.params.userId }) ;
    const reviews = await Review.find({ studentId: student._id });
    
    if (reviews) {
        res.status(201).json(reviews);
    } else {
        res.status(400);
        throw new Error('Could not get reviews for the user!');
    }
});

router.post('/', async (req, res) => {
    const { expression, subject, studentId, type } = req.body;

    if (!expression || !subject || !studentId || !type) {
        res.status(400);
        throw new Error('Please add all fields!');
    }

    const review = await Review.create({
        expression,
        subject,
        studentId,
        type
    });

    if (review) {
        res.status(201).json(review);
    } else {
        res.status(400);
        throw new Error('Invalid review data!');
    }
});

module.exports = router;