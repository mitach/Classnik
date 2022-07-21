const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const SALT_ROUNDS = process.env.SALT_ROUNDS;

router.post('/register', async (req, res) => {
    console.log(req.body);

    const hashedPassword = await bcrypt.hash(req.body.password, Number(SALT_ROUNDS));

    console.log(hashedPassword);

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
    });

    user.save()
        .then(result => {
            res.status(201).json({
                message: 'User Created!',
                result: result
            });
        })
        .catch((err) => {
            console.log(err);
        })


})

module.exports = router;