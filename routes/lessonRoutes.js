const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lessons');

// Get Lessons by Grade
router.get('/:grade', async (req, res) => {
    try {
        const lessons = await Lesson.find({ grade: req.params.grade });
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add New Lesson
router.post('/', async (req, res) => {
    const { grade, topic, content, videoURL, quiz } = req.body;

    try {
        const newLesson = new Lesson({ grade, topic, content, videoURL, quiz });
        await newLesson.save();
        res.status(201).json(newLesson);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
