const express = require('express');
const router = express.Router();

const Contacts = require('../models/Contacts');

router.get('/', async (req, res) => {
    const contacts = await Contacts.find();

    if (contacts) {
        res.status(201).json(contacts);
    }
});

router.post('/', async (req, res) => {
    const {city, street, email, phone} = req.body;

    if (!city || !street || !email || !phone) {
        res.status(400);
        throw new Error('Please add all fields!');
    }

    const contacts = await Contacts.create({
        city, 
        street,
        email,
        phone
    });

    if (contacts) {
        res.status(201);
    } else {
        res.status(400);
        throw new Error('Invalid grade data!');
    }
});

router.put('/', async (req, res) => {
    const contacts = await Contacts.find();
    await Contacts.findByIdAndUpdate(contacts[0]._id, req.body);
})

module.exports = router;