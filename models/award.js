const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
});

const Award = mongoose.model('Award', awardSchema);

module.exports = Award;
