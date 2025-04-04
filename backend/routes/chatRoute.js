const express = require('express');
const router = express.Router();
const ChatController = require('../controller/chatController');

router.post('/chatbot', ChatController.ChatController);

module.exports = router;
