const mongoose = require("mongoose");

const researchSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
});

const Research = mongoose.model("Research", researchSchema);
module.exports = Research;
