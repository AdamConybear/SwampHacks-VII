const Example = require("../models/examples.server.model.js");

exports.hello = function (req, res) {
  res.send("world");
};

exports.generatePassword = function (req, res) {
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

  res.send(random_password_generate(6, 6));
};
