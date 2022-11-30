const db = require("../models");
const Lecturer = db.lecturers;

// Create and Save a new Animal
exports.create = (req, res) => {
    // Validate request
    if (!req.body.LecturerFName) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    
    // Create a Animal model object
    const lecturer = new Lecturer({
      LecturerID: req.body.LecturerID,
      LecturerFName: req.body.LecturerFName,
      LecturerSName: req.body.LecturerSName,
      LecturerPassword: req.body.LecturerPassword
    });
    
    // Save Animal in the database
    lecturer
      .save()
      .then(data => {
        console.log("Animal saved in the database: " + data);
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

// Retrieve all Animals from the database.
exports.findAll = (req, res) => {
    const name = req.query.LecturerFName;
    //We use req.query.name to get query string from the Request and consider it as condition for findAll() method.
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
            err.message || "Some error occurred while retrieving Animals."
        });
      });
   };

// Find a single Animal with an id
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
    err.message || "Some error occurred while retrieving Sessions."
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
      err.message || "Some error occurred while retrieving Sessions."
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
      err.message || "Some error occurred while retrieving Modules."
  });
});
};

// Update a Animal by the id in the request
exports.update = (req, res) => {
 
};
 
// Delete a Animal with the specified id in the request
exports.delete = (req, res) => {
 
};
 
// Delete all Animal from the database.
exports.deleteAll = (req, res) => {
 
};