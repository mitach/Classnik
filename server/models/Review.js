const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    expression: {type: String, required: true},
    subject: {type: String, required: true},
    studentId: {type: mongoose.SchemaTypes.ObjectId, ref: 'Student'},
    type: {type: String, required: true},
}, {
    timestamps: true,
    minimize: false,
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;