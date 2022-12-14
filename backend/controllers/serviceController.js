const Info = require("../models/infoModel");
const ErrorHandler = require("../utlis/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

//CREATE INFO
exports.createInfo = catchAsyncError(async (req, res, next) => {
  const infoData = await Info.create(req.body);

  res.status(201).json({
    success: true,
    infoData,
  });
});

//GET ALL INFO
exports.getAllInfoDatas = catchAsyncError(async (req, res, next) => {
  const infoCount = await Info.countDocuments();

  const infoDatas = await Info.find();

  res.status(200).json({
    success: true,
    infoDatas,
    infoCount,
  });
});

//GET INFO DETAILS
exports.getInfoDetail = catchAsyncError(async (req, res, next) => {
  const infoData = await Info.findById(req.params.id);

  if (!infoData) {
    return next(new ErrorHandler("Info not found", 404));
  }

  res.status(200).json({
    success: true,
    infoData,
  });
});

//UPDATE INFO
exports.updateInfo = catchAsyncError(async (req, res, next) => {
  let infoData = await Product.findById(req.params.id);

  if (!infoData) {
    return next(new ErrorHandler("Info not found", 404));
  }

  infoData = await Info.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    infoData,
  });
});

//DELETE INFO
exports.deleteInfo = catchAsyncError(async (req, res, next) => {
  const infoData = await Info.findById(req.params.id);

  if (!infoData) {
    return next(new ErrorHandler("Info not found", 404));
  }

  await infoData.remove();

  res.status(200).json({
    success: true,
    message: "infoData deleted successfully",
  });
});
