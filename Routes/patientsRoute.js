const express = require("express");
const auth = require("../util/auth");

const {
	postPatientLogin,
	postIsTokenValid,
	getCurrentPatient,
	getPatientById,
} = require("../Controllers/patientsController");

const router = express.Router();

router.post("/login", postPatientLogin);
router.post("/is-token-valid", postIsTokenValid);

router.get("/get-current-patient", auth, getCurrentPatient);

router.get("/get-patient-by-id/:id", getPatientById);

module.exports = router;
