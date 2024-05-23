// backend/services/llmService.js

const axios = require('axios');

const generateResponse = async (message) => {
  try {
    // Replace the URL and headers with actual API details if available
    const response = await axios.post('https://api.your-llm.com/generate', {
      prompt: message,
      max_tokens: 150,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.LLM_API_KEY}`,
      },
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error generating response from LLM:', error);
    return 'The user is currently busy. Please try again later.';
  }
};

// Mock function if LLM API is not available
const mockGenerateResponse = async (message) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Automated response to: ${message}`);
    }, 2000); // Simulate a delay
  });
};

module.exports = {
  generateResponse,
  mockGenerateResponse,
};
