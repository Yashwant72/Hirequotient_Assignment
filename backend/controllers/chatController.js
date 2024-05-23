// backend/controllers/chatController.js

const Message = require('../models/Message');
const asyncHandler = require('express-async-handler');

// @desc    Send a message
// @route   POST /api/chat
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
  const { content, to } = req.body;
  const from = req.user._id;

  const message = await Message.create({
    content,
    from,
    to,
  });

  if (message) {
    res.status(201).json(message);
  } else {
    res.status(400);
    throw new Error('Message not sent');
  }
});

// @desc    Get messages between two users
// @route   GET /api/chat/:userId
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const from = req.user._id;
  const to = req.params.userId;

  const messages = await Message.find({
    $or: [
      { from, to },
      { from: to, to: from },
    ],
  }).sort({ createdAt: 1 });

  if (messages) {
    res.status(200).json(messages);
  } else {
    res.status(404);
    throw new Error('Messages not found');
  }
});

module.exports = {
  sendMessage,
  getMessages,
};
