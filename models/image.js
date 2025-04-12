
const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: String,
  public_id: String, // add this field
});

module.exports = mongoose.model("Image", imageSchema);
