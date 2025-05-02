const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: String,
  public_id: String,
  type: { type: String, enum: ["image", "video"], default: "image" }, // <-- new
});

module.exports = mongoose.model("Image", imageSchema);
