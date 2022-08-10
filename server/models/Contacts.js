const mongoose = require('mongoose');

const contactsSchema = new mongoose.Schema({
    city: {type: String, required: true},
    street: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
}, {
    timestamps: true,
});

const Contacts = mongoose.model('Contacts', contactsSchema);

module.exports = Contacts;