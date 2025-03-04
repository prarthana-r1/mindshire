const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');
const { protect, authorize } = require('../middleware/authMiddleware');

// Get lessons by grade (Anyone logged in)
router.get('/:grade', protect, async (req, res) => {
    try {
        const lessons = await Lesson.find({ grade: req.params.grade });
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a lesson (Only Teachers & Admins)
router.post('/', protect, authorize('teacher', 'admin'), async (req, res) => {
    try {
        const { grade, topic, content, videoURL, quiz } = req.body;
        const newLesson = new Lesson({ grade, topic, content, videoURL, quiz });
        await newLesson.save();
        res.status(201).json(newLesson);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a lesson (Only Admin)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
    try {
        await Lesson.findByIdAndDelete(req.params.id);
        res.json({ message: 'Lesson deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
