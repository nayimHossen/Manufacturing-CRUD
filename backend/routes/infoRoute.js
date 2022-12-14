const express = require("express");
const {
  updateInfo,
  deleteInfo,
  getInfoDetail,
  createInfo,
  getAllInfoDatas,
} = require("../controllers/serviceController");

const router = express.Router();

router.route("/info").get(getAllInfoDatas);
router.route("/info/new").post(createInfo);
router.route("/info/:id").put(updateInfo).delete(deleteInfo).get(getInfoDetail);

module.exports = router;
