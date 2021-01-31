const sessionController = require("../controllers/sessionController"),
	express = require("express"),
	router = express.Router();

router.route("/getSession").get(sessionController.getSession);

router.route("/getPlayer").get(sessionController.getPlayer);

router.route("/").get(sessionController.hello);

router.route("/createSession").post(sessionController.createSession);

router.route("/createPlayer").post(sessionController.createPlayer);

router.route("/updatePlayer").post(sessionController.updatePlayer);

router.route("/updateMeeting").post(sessionController.updateMeeting);

//router.route("/upload").get(examples.upload);

module.exports = router;
