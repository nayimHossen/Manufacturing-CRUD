const express = require("express");
const { getAllSectors } = require("../controllers/sectorsController");

const router = express.Router();

router.route("/sectors").get(getAllSectors);

module.exports = router;
