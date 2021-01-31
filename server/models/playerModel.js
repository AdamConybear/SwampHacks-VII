const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
	meetingId: String,
	playerId: String,
	name: String,
	ready: Boolean,
	beat: String,
	bar: String,
});

module.exports = {
	Item: mongoose.model("Player", playerSchema),
};
