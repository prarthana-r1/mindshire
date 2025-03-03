const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');
const { protect } = require('../middleware/authMiddleware');

// Get Lessons by Grade (Only Authenticated Users)
router.get('/:grade', protect, async (req, res) => {
    try {
        const lessons = await Lesson.find({ grade: req.params.grade });
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
