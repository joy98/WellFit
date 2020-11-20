const express = require("express");
const { getConditions } = require("../Controllers/conditionsController");

const router = express.Router();

router.get("/get-conditions", getConditions);

module.exports = router;
