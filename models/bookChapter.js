const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookChapterSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: String,
    required: true,
  },
  chapter: {
    type: String,
    required: true,
  },
  links: {
    pdf: {
      type: String,
      default: "#",
    },
  },
}, {
  timestamps: true // optional, adds createdAt and updatedAt
});

const BookChapter = mongoose.model("BookChapter", bookChapterSchema);
module.exports = BookChapter;
