const examples = require("../controllers/examples.server.controller.js"),
  express = require("express"),
  router = express.Router();

router.route("/").get(examples.hello);

router.route("/generatePassword").get(examples.generatePassword);

//router.route("/upload").get(examples.upload);

module.exports = router;
