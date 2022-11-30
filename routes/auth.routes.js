const { verifySignUp } = require("../middlewares");
const { verifySignUpStu } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const { _applyPlugins } = require("mongoose");
module.exports = function(app) {
  console.log("hereffs"),
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/auth/Lecsignup/",
    [
      verifySignUp.checkDuplicateUsernameLec
    ],
    controller.Lecsignup
  );

  app.post(
    "/auth/signupStu",
    [
      verifySignUpStu.checkDuplicateUsername
    ],
    controller.Stusignup
  );

  app.post("/auth/Lsignin", controller.Lecsignin);

  app.post("/auth/Ssignin", controller.Stusignin);

  
};