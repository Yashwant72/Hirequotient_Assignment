// backend/routes/chatRoutes.js

const express = require('express');
const { sendMessage, getMessages } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, sendMessage);
router.get('/:userId', protect, getMessages);

module.exports = router;
