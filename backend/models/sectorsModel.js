const mongoose = require("mongoose");

const sectorSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, "Please enter sectors"],
    trim: true,
  },
  sectors: [],
});

module.exports = mongoose.model("Sector", sectorSchema);
