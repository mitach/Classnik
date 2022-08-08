const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    studentId: {type: mongoose.SchemaTypes.ObjectId, ref: 'Student'},
    grade: {type: String, required: true},
    subject: {type: String, required: true},
}, {
    timestamps: true,
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;