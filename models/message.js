const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  user: String,
  text: String,
  added: String,
});

module.exports = mongoose.model('Message', messageSchema);