const jwt = require("jsonwebtoken");
require("dotenv").config();

const Patients = require("../Models/patients");

exports.getAllergies = async (req, res) => {
	try {
		const whatever = await Patients.find({}).limit(20);

		return res.json(whatever);
	} catch (err) {
		return res.json({});
	}
};

exports.postPatientLogin = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password)
			return res.status(400).json({ msg: "Not all fields have been entered." });

		const user = await Patients.findOne({ EMAIL: email });
		if (!user)
			return res
				.status(400)
				.json({ msg: "No account with this email has been registered." });

		let isMatch = false;

		if (password.toString() === user.PASSWORD.toString()) {
			isMatch = true;
		}

		if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
		res.json({
			token,
			user: {
				id: user._id,
				displayName: user.displayName,
			},
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.postIsTokenValid = async (req, res) => {
	try {
		const token = req.header("x-auth-token");
		if (!token) return res.json(false);

		const verified = jwt.verify(token, process.env.JWT_SECRET);
		if (!verified) res.json(false);

		return res.json(true);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.getCurrentPatient = async (req, res) => {
	try {
		const patient = await Patients.findById(req.user);

		res.json(patient);
	} catch (err) {
		console.log(err);
		res.json(null);
	}
};

exports.getPatientById = async (req, res) => {
	try {
		const patient = await Patients.findById(req.params.id);

		res.json({
			patient,
		});
	} catch (err) {
		console.log(err);
		res.json(null);
	}
};
