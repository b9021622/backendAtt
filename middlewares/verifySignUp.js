const db = require("../models");
const Lecturer = db.lecturers;

checkDuplicateUsernameLec = (req, res, next) => {
  // Username
  console.log("here");
  Lecturer.findOne({
    LecturerID: req.body.username
  }).exec((err, user) => {
    if (err) {
      
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    next();

  });
};

const verifySignUp = {
  
  checkDuplicateUsernameLec
};

module.exports = verifySignUp;