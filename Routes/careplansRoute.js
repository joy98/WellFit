const express = require("express");
const { getCareplans } = require("../Controllers/careplansController");

const router = express.Router();

router.get("/get-careplans", getCareplans);

module.exports = router;
