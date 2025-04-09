const mongoose = require('mongoose');

const conferencePublicationSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('ConferencePublication', conferencePublicationSchema);
