const db = require("../models");
const Lecturer = db.lecturers;

exports.create = (req, res) => {
    if (!req.body.LecturerFName) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    
    const lecturer = new Lecturer({
      LecturerID: req.body.LecturerID,
      LecturerFName: req.body.LecturerFName,
      LecturerSName: req.body.LecturerSName,
      LecturerPassword: req.body.LecturerPassword
    });
    

    lecturer
      .save()
      .then(data => {
        console.log(" Lecturer saved in the database: " + data);
        res.redirect('/lecturer/lecturers');
        //res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Lecturer."
        });
      });
   };

exports.findAll = (req, res) => {
    const name = req.query.LecturerFName;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
     Lecturer
      .find(condition)
      .then(data => {
        // res.render('lecturers',
        //   {title: 'lecturers',
        //    lecturers: data});
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Lecturer."
        });
      });
   };

exports.findOne = (req, res) => {
  console.log(req.params);
  const LecturerID = req.params.id;
  console.log(LecturerID);
  var condition = LecturerID ? { _id: LecturerID} : {};
db.lecturers
.find(condition)
.then(data => {
  console.log(data),
// res.render('MySessions',
//   {title: 'sessions',
//    sessions: data});
res.send(data);
})
.catch(err => {
res.status(500).send({
  message:
    err.message || "Some error occurred while retrieving Lecturer."
});
});
};
exports.getSessions = (req, res) => {
    console.log(req.params);
    const LecturerID = req.params.id;
    console.log(LecturerID);
    var condition = LecturerID ? { Lecturer: LecturerID} : {};
db.sessions
.find(condition)
.then(data => {
    console.log(data),
  res.render('MySessions',
    {title: 'sessions',
     sessions: data});
  //res.send(data);
})
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving Lecturer."
  });
});
};

exports.getModules = (req, res) => {
    console.log(req.params);
    const LecturerID = req.params.id;
    console.log(LecturerID);
    var condition = LecturerID ? { ModuleLecturers: LecturerID} : {};
db.modules
.find(condition)
.then(data => {
    console.log(data),
  // res.render('MyModules',
  //   {title: 'modules',
  //    modules: data});
  res.send(data);
})
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving Lecturer."
  });
});
};

exports.update = (req, res) => {
 
};
 
exports.delete = (req, res) => {
 
};
 
exports.deleteAll = (req, res) => {
 
};