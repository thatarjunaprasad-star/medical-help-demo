// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const GOOGLE_CHAT_TOKEN = process.env.GOOGLE_CHAT_TOKEN || 'YOUR_GOOGLE_CHAT_TOKEN';

// Google Chat webhook endpoint
// Google Chat sends an event JSON to this URL. Respond with a text message.
app.post('/chatbot', async (req, res) => {
  const event = req.body;
  if (event && event.message && event.message.text) {
    const receivedText = event.message.text;
    const lower = receivedText.toLowerCase();
    let replyText;
    if (lower.includes('appointment')) {
      replyText = '🩺 Great! Please share your preferred date and time, and we will schedule a remote consultation.';
    } else if (lower.includes('symptom')) {
      replyText = '💬 Tell us more about your symptoms, and a medical professional will get back to you shortly.';
    } else {
      replyText = '👋 Welcome to Mobile Medical Help! You can ask for an appointment, share symptoms, or request health advice.';
    }
    // Respond according to Google Chat format
    res.json({ text: replyText });
  } else {
    res.sendStatus(200);
  }
});


// (Facebook integration removed – Google Chat now handles all messaging)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
