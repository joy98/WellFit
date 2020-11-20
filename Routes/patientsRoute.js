const express = require("express");
const auth = require("../util/auth");

const {
	postPatientLogin,
	postIsTokenValid,
	getCurrentPatient,
} = require("../Controllers/patientsController");

const router = express.Router();

router.post("/login", postPatientLogin);
router.post("/is-token-valid", postIsTokenValid);

router.get("/get-current-patient", auth, getCurrentPatient);

module.exports = router;
