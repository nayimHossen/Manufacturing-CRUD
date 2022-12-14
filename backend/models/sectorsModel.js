const mongoose = require("mongoose");

const sectorSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, "Please enter sectors"],
    trim: true,
  },
  sectors: [],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Sector", sectorSchema);
