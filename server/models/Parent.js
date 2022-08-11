const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    studentEmail: {type: String, required: true},
}, {
    timestamps: true,
    minimize: false,
});

const Parent = mongoose.model('Parent', parentSchema);

module.exports = Parent;