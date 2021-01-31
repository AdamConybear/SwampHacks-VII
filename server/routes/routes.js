const routes = require("../controllers/controller.js"),
  express = require("express"),
  router = express.Router();

router.route("/getSession").get(routes.getSession);

router.route("/getPlayer").get(routes.getPlayer);

router.route("/").get(routes.hello);

router.route("/createSession").post(routes.createSession);

router.route("/createPlayer").post(routes.createPlayer);

router.route("/updatePlayer").post(routes.updatePlayer);

router.route("/updateMeeting").post(routes.updateMeeting);

//router.route("/upload").get(examples.upload);

module.exports = router;
