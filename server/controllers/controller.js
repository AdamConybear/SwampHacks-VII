const Player = require("../models/playerModel.js").Item;
const Session = require("../models/sessionModel.js").Item;

exports.hello = function (req, res) {
  res.send("world");
};

//ADD CHECKS TO MAKE SURE PASSWORD DOESNT EXIST
function random_password_generate(max, min) {
  var passwordChars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#@!%&()/";
  var randPwLen = Math.floor(Math.random() * (max - min + 1)) + min;
  var randPassword = Array(randPwLen)
    .fill(passwordChars)
    .map(function (x) {
      return x[Math.floor(Math.random() * x.length)];
    })
    .join("");
  return randPassword;
}

exports.createSession = function (req, res) {
  const sessionPassword = random_password_generate(6, 6);

  //create new session model in database
  new Session({
    meetingId: sessionPassword,
    round: 0,
    beat: "",
    players: [],
    lyrics: [],
  }).save();

  res.json({ meetingId: sessionPassword });
};

exports.createPlayer = async function (req, res) {
  const meetingId = req.body.meetingId;

  //check that meeting exists
  await Session.findOne({ meetingId: meetingId }).then((session) => {
    if (session) {
      const playerId = random_password_generate(10, 10);
      const name = req.body.name;

      //create new player in database
      new Player({
        meetingId: meetingId,
        playerId: playerId,
        name: name,
        ready: true,
        beat: "",
        bar: "",
      }).save();

      //add player to session
      let otherPlayers = session.players;
      otherPlayers.push({ playerId: playerId });
      session.players = otherPlayers;
      session
        .save()
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(200).send(err);
        });
    } else {
      return res.status(200).send({
        error: "Meeting does not exist.",
      });
    }
  });
};

exports.updatePlayer = async function (req, res) {
  await Player.findOne({ playerId: req.body.player.playerId }).then(
    (player) => {
      if (player) {
        player.beat = req.body.player.beat;
        player.bar = req.body.player.bar;
        player.ready = req.body.player.ready;

        player
          .save()
          .then((data) => {
            res.json(data);
          })
          .catch((err) => {
            res.status(200).send(err);
          });
      } else {
        return res.status(200).send({
          error: "Player does not exist.",
        });
      }
    }
  );
};

exports.updateMeeting = async function (req, res) {
  await Session.findOne({ meetingId: req.body.session.meetingId }).then(
    (session) => {
      if (session) {
        session.players = req.body.session.players;
        session.round = req.body.session.round;
        session.voting = req.body.session.voting;
        session.beat = req.body.session.beat;
        session.lyrics = req.body.session.lyrics;

        session
          .save()
          .then((data) => {
            res.json(data);
          })
          .catch((err) => {
            res.status(200).send(err);
          });
      } else {
        return res.status(200).send({
          error: "Session does not exist.",
        });
      }
    }
  );
};

exports.getSession = async function (req, res) {
  const meetingId = req.body.meetingId;
  await Session.findOne({ meetingId: meetingId }).then((session) => {
    if (session) {
      res.send(session);
    } else {
      return res.status(200).send({
        error: "Session does not exist.",
      });
    }
  });
};

exports.getPlayer = async function (req, res) {
  await Player.findOne({ playerId: req.body.playerId }).then((player) => {
    if (player) {
      res.send(player);
    } else {
      return res.status(200).send({
        error: "Player does not exist.",
      });
    }
  });
};
