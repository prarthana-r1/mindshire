const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    grade: { type: Number, required: true },  // Grade level (1-12)
    topic: { type: String, required: true },  // Lesson title
    content: { type: String, required: true }, // Lesson details
    videoURL: { type: String }, // Optional video link
    quiz: [{ 
        question: String, 
        options: [String], 
        correctAnswer: String 
    }],
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);
