const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  meetingId: String,
  players: [
    {
      playerId: String,
    },
  ],
  round: Number,
  voting: Boolean,
  beat: String,
  lyrics: [
    {
      bar: String,
    },
  ],
});

module.exports = {
  Item: mongoose.model("Session", sessionSchema),
};
