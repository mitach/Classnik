const express = require('express');
const router = express.Router();

const Review = require('../models/Review');

router.post('/', async (req, res) => {
    const {expression, subject, studentId, type} = req.body;

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