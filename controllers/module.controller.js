const { ObjectId } = require("mongoose");
const { lecturers, modules, mongoose } = require("../models");
const db = require("../models");
const Module = db.modules;
//const mongoose = require('mongoose')
// Create and Save a new Animal
exports.create = (req, res) => {
    // Validate request
    if (!req.body.ModuleID) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    //console.log(data);
    // Create a Animal model object
    const module = new Module({
      ModuleID: req.body.ModuleID,
      ModuleName: req.body.ModuleName,
      ModuleLeader: req.body.ModuleLeader
    })
    
    module
      .save()
      .then(data => {
        console.log("Module saved in the database: " + data);
        db.courses.findByIdAndUpdate(
          req.body.CourseID,  
          { $push: { Modules: module._id } },
          { new: true, useFindAndModify: false })
        .then(data => {
         //data
          //console.log(`The updated course: ${data}`);
          // Returning the new animal
          
          //res.redirect('/module/modules');
          res.send(data);
        })
        //res.redirect('/module/modules');
        
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Animal."
        });
      });
   };

// Retrieve all Animals from the database.
exports.findAll = (req, res) => {
    const name = req.query.ModuleName;
    //We use req.query.name to get query string from the Request and consider it as condition for findAll() method.
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
     Module
      .find(condition)
      .then(data => {
        // res.render('modules',
        //   {title: 'module list',
        //    modules: data});
        console.log(data);
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Animals."
        });
      });
   };
 
exports.addLecturer = (req, res) => {
db.modules.updateOne(
  { ModuleID:  req.body.ModuleID },
  { $push: { ModuleLecturers: req.body.LecturerID } }
)
.catch(err => {
res.status(500).send({
  message:
    err.message || "Some error occurred while retrieving Modules."
});
});
};

exports.addStudents = (req, res) => {
  db.modules.updateOne(
    { ModuleID:  req.body.ModuleID },
    { $push: { StudentsEnrolled: req.body.StudentID } }
  )
  .catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving Modules."
  });
  });
  };
// Find a single Animal with an id
exports.findOne = (req, res) => {
  console.log(req.params);
  const ModuleID = req.params.id;
  console.log(ModuleID);
  var condition = ModuleID ? { _id: ModuleID} : {};
db.modules
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
// Update a Animal by the id in the request
exports.update = (req, res) => {
  const ModuleID = req.params.id;
 // modules.deleteOne({_id: ModuleID});
 var condition = ModuleID ? { "ModuleID": ModuleID} : {};
 //var myquery = { "_id": new mongoose.Types.ObjectId(ModuleID)};
 console.log(condition);
 modules.findByIdAndUpdate(ModuleID, req.body, function (err, docs) {
  if (err){
      console.log(err)
  }
  else{
      console.log("Removed User : ", docs);
  }});
  res.send("Updated");
};
 
// Delete a Animal with the specified id in the request
exports.delete = (req, res) => {
  const ModuleID = req.params.id;
 // modules.deleteOne({_id: ModuleID});
 var condition = ModuleID ? { "ModuleID": ModuleID} : {};
 //var myquery = { "_id": new mongoose.Types.ObjectId(ModuleID)};
 console.log(condition);
 modules.findByIdAndRemove(ModuleID, function (err, docs) {
  if (err){
      console.log(err)
  }
  else{
      console.log("Removed User : ", docs);
  }});
//   try {
//     modules.findOne(condition);
//  } catch (e) {
//     console.log(e);
//  }
 res.send("DELETED");
};
 
// Delete all Animal from the database.
exports.deleteAll = (req, res) => {
 
};