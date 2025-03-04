const express = require('express');
const router = express.Router();
const User = require('../models/Users');

// Get All Users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Register User
router.post('/register', async (req, res) => {
    const { name, email, password, role, grade } = req.body;

    try {
        const newUser = new User({ name, email, password, role, grade });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
