const mongoose = require('mongoose');

const talkSchema = new mongoose.Schema({
  description: String,
});

module.exports = mongoose.model('Talk', talkSchema);
