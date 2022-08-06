const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    studentClass: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    grades: [],
}, {
    timestamps: true,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;