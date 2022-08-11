const express = require('express');
const router = express.Router();

const Parent = require('../models/Parent');

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

module.exports = router;