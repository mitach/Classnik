const mongoose = require('mongoose');

const studentClassSchema = new mongoose.Schema({
    name: { type: String, required: true },
    students: [],
    schedule: {type: mongoose.SchemaTypes.Mixed, default: {}},
}, {
    timestamps: true,
    minimize: false,
});

const StudentClass = mongoose.model('StudentClass', studentClassSchema);

module.exports = StudentClass;