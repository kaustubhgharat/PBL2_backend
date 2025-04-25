const mongoose = require('mongoose');

const phdStudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  guide: {
    type: String,
    required: true,
  },
  academicYear: {
    type: String,
    required: true,
  },
});

const PhdStudent = mongoose.model('PhdStudent', phdStudentSchema);

module.exports = PhdStudent;
