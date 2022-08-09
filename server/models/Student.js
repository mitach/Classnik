const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    studentClass: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    grades: {type: mongoose.SchemaTypes.Mixed, default: {}},
}, {
    timestamps: true,
    minimize: false,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;