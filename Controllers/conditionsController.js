const Conditions = require("../Models/conditions");

exports.getConditions = async (req, res) => {
	try {
		const whatever = await Conditions.find({});

		return res.json(whatever);
	} catch (err) {
		return res.json({});
	}
};
