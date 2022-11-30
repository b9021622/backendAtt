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
            err.message || "Some error occurred while creating the Course."
        });
      });
   };

exports.findAll = (req, res) => {
    const name = req.query.CourseName;
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
            err.message || "Some error occurred while retrieving Courses."
        });
      });
   };
 
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
    err.message || "Some error occurred while retrieving Courses."
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
      err.message || "Some error occurred while retrieving Courses."
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
        err.message || "Some error occurred while retrieving Courses."
    });
    });
    };
exports.update = (req, res) => {
  console.log(req.body);
const CourseID = req.params.id;
 db.courses.findByIdAndUpdate(CourseID, req.body, function (err, docs) {
  if (err){
      console.log("he")
  }
  else{
      console.log("Updated Course : ", docs);
  }});
  res.send("updates");
};
 
exports.delete = (req, res) => {
  const CourseID = req.params.id;
 db.courses.findByIdAndRemove(CourseID, function (err, docs) {
  if (err){
      console.log(err)
  }
  else{
      console.log("Removed Course : ", docs);
  }});
//   try {
//     modules.findOne(condition);
//  } catch (e) {
//     console.log(e);
//  }
 res.send("DELETED");
};
 
exports.deleteAll = (req, res) => {
 
};