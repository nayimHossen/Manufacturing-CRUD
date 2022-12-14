const Sector = require("../models/sectorsModel");
const catchAsyncError = require("../middleware/catchAsyncError");

//GET ALL INFO
exports.getAllSectors = catchAsyncError(async (req, res, next) => {
  const sectorCount = await Sector.countDocuments();

  const sectors = await Sector.find();

  res.status(200).json({
    success: true,
    sectors,
    sectorCount,
  });
});
