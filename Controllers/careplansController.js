const Careplans = require("../Models/careplans");

exports.getCareplans = async (req, res) => {
	try {
		const whatever = await Careplans.find({});

		return res.json(whatever);
	} catch (err) {
		return res.json({});
	}
};
