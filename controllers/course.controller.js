const db = require("../models");
const Course = db.courses;

// Create and Save a new Animal
exports.create = (req, res) => {
    // Validate request
    if (!req.body.CourseID) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    
    // Create a Animal model object
    const course = new Course({
      CourseID: req.body.CourseID,
      CourseName: req.body.CourseName,
      CourseLeader: req.body.CourseLeader
    });
    //console.log(data);
    // Save Animal in the database
    course
      .save()
      .then(data => {
        console.log("course saved in the database: " + data);
        db.lecturers.findByIdAndUpdate(
          req.body.CourseLeader,  //We assume userid is an attribute in the JSON
          { $push: { CoursesLed: data._id } },
          { new: true, useFindAndModify: false }
        ).then(data => {
          console.log(`The updated course: ${data}`);
          // Returning the new animal
          //res.send(data);
        });
        res.redirect('/course/courses');
        //res.send(data);
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
    const name = req.query.CourseName;
    //We use req.query.name to get query string from the Request and consider it as condition for findAll() method.
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
     Course
      .find(condition)
      .then(data => {
        // res.render('courses',
        //   {title: 'course list',
        //    courses: data});
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
  //console.log(req.params);
  const CourseID = req.params.id;
  console.log(CourseID);
  var condition = CourseID ? { _id: CourseID} : {};
db.courses
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
exports.addStudents = (req, res) => {
  db.courses.updateOne(
    { CourseID:  req.body.CourseID },
    { $push: { StudentsEnrolled: req.body.StudentID } }
  )
  .catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving Modules."
  });
  });
  };


  exports.addModule = (req, res) => {
    db.courses.updateOne(
      { _id:  req.body.CourseID },
      { $push: { Modules: req.body.ModuleId } },
      console.log("here"),
      console.log(req.body)
    )
    .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Modules."
    });
    });
    };
// Update a Animal by the id in the request
exports.update = (req, res) => {
  console.log(req.body);
const CourseID = req.params.id;
 db.courses.findByIdAndUpdate(CourseID, req.body, function (err, docs) {
  if (err){
      console.log("he")
  }
  else{
      console.log("Updated User : ", docs);
  }});
  res.send("updates");
};
 
// Delete a Animal with the specified id in the request
exports.delete = (req, res) => {
  const CourseID = req.params.id;
 // modules.deleteOne({_id: ModuleID});
 db.courses.findByIdAndRemove(CourseID, function (err, docs) {
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