const mongoose = require('mongoose');

const studentClassSchema = new mongoose.Schema({
    name: { type: String, required: true },
    students: [],
}, {
    timestamps: true,
});

const StudentClass = mongoose.model('StudentClass', studentClassSchema);

module.exports = StudentClass