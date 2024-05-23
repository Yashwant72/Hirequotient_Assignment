// backend/controllers/statusController.js

const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Set user status
// @route   PUT /api/status
// @access  Private
const setStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const user = await User.findById(req.user._id);

  if (user) {
    user.status = status;
    await user.save();
    res.status(200).json({ status: user.status });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user status
// @route   GET /api/status/:userId
// @access  Private
const getStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (user) {
    res.status(200).json({ status: user.status });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = {
  setStatus,
  getStatus,
};
