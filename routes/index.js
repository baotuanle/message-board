const express = require('express');
const router = express.Router();
const Message = require('../models/message'); // Path to your Message model

function formatDate(date) {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };

  return date.toLocaleString('en-US', options);
}

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const messages = await Message.find().sort({ _id: 1 });
    res.render('index', { title: "Mini Messageboard", messages: messages });
  } catch (error) {
    next(error);
  }
});

router.post('/addMessage', async function(req, res, next) {
  const user = req.body.user;
  const text = req.body.text;
  const added = new Date();

  const newMessage = new Message({
    user: user,
    text: text,
    added: formatDate(added)
  });

  try {
    await newMessage.save();
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
