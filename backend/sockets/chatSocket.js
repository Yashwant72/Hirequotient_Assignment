// backend/sockets/chatSocket.js

const { getUserStatus } = require('../services/userService');
const { generateResponse, mockGenerateResponse } = require('../services/llmService');
const Message = require('../models/Message');

const chatSocket = (io, socket) => {
  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined`);
  });

  socket.on('sendMessage', async (data) => {
    const { content, to, from } = data;

    const recipientStatus = await getUserStatus(to);
    let messageContent = content;

    if (recipientStatus === 'BUSY') {
      try {
        messageContent = await Promise.race([
          generateResponse(content),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), 10000)
          ),
        ]);
      } catch (error) {
        messageContent = 'The user is currently busy. Please try again later.';
      }
    }

    const message = await Message.create({
      content: messageContent,
      from,
      to,
    });

    io.to(to).to(from).emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
};

module.exports = chatSocket;
