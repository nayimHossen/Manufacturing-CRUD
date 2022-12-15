const mongoose = require("mongoose");

const infoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
    trim: true,
  },
  sector: [],
  agree: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Info", infoSchema);
