const mongoose = require("mongoose");

const infoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
    trim: true,
  },
  sectors: [],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Info", infoSchema);
