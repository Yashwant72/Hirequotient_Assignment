// backend/services/userService.js

const User = require('../models/User');

const getUserStatus = async (userId) => {
  const user = await User.findById(userId);

  if (user) {
    return user.status;
  } else {
    throw new Error('User not found');
  }
};

module.exports = {
  getUserStatus,
};
