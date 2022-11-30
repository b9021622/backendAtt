const config = require("../config/auth.config");
const db = require("../models");
const Lecturer = db.lecturers;
const Student = db.students;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.Lecsignup = (req, res) => {
  console.log("req.body");
  console.log(req.body);
  const lecturer = new Lecturer({
    LecturerID: req.body.username,
    LecturerFName: req.body.FName,
    LecturerSName: req.body.SName,
    LecturerPassword: bcrypt.hashSync(req.body.password, 8)
  });
  console.log("herssseffs");
  lecturer
    .save()
    .then(data => {
        console.log("Signup User saved in the database");
        res.send({ message: "User was registered successfully!" });
    })
    .catch(err => {
        res.status(500).send({ 
            message:  "Some error during signup"});
    });
};

exports.Stusignup = (req, res) => {
  console.log(req.body);
  const student = new Student({
    StudentID: req.body.username,
    StudentFName: req.body.FName,
    StudentSName: req.body.SName,
    StudentPassword: bcrypt.hashSync(req.body.password, 8)
  });

  student
    .save()
    .then(data => {
        console.log("Signup student saved in the database");
        res.send({ message: "student was registered successfully!" });
    })
    .catch(err => {
        res.status(500).send({ 
            message: err || "Some error during signup"});
    });
};


exports.Lecsignin = (req, res) => {
  console.log(req.body);
  Lecturer.findOne({
    LecturerID: req.body.username
  })
    .exec((err, lecturer) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!lecturer) {
        return res.status(404).send({ message: "User Not found." });
      }
      
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        lecturer.LecturerPassword
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: lecturer._id, role:"Lecturer" }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: lecturer._id,
        username: lecturer.LecturerID, 
        //role: "Lecturer",       
        accessToken: token
      });
    });
};

exports.Stusignin = (req, res) => {
  Student.findOne({
    StudentID: req.body.username
  })
    .exec((err, student) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!student) {
        return res.status(404).send({ message: "User Not found." });
      }
      console.log(req.body);
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        student.StudentPassword
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: student._id ,role:"Student" }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: student._id,
        username: student.StudentID,  
        //role: "Student",      
        accessToken: token
      });
    });
};