const db = require("../models");
const Student = db.students;

// Create and Save a new Animal
exports.create = (req, res) => {
    // Validate request
    if (!req.body.StudentFName) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    
    // Create a Animal model object
    const student = new Student({
    StudentID: req.body.StudentID,
    StudentFName: req.body.StudentFName,
    StudentSName: req.body.StudentSName,
    StudentPassword: req.body.StudentPassword
    });
    
    // Save Animal in the database
    student
      .save()
      .then(data => {
        console.log("Student saved in the database: " + data);
        res.redirect('/student/students');
        //res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Student."
        });
      });
   };

// Retrieve all Animals from the database.
exports.findAll = (req, res) => {
    const name = req.query.StudentFName;
    //We use req.query.name to get query string from the Request and consider it as condition for findAll() method.
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
     Student
      .find(condition)
      .then(data => {
        // res.render('students',
        //   {title: 'students',
        //    students: data});
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving students."
        });
      });
   };
 
// Find a single Animal with an id
exports.findOne = (req, res) => {
    console.log(req.params);
    const StudentID = req.params.id;
    console.log(StudentID);
    var condition = StudentID ? { _id: StudentID} : {};
  db.students
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
exports.getModules = (req, res) => {
    console.log(req.params);
    const StudentID = req.params.id;
    var condition = StudentID ? { StudentsEnrolled: StudentID} : {};
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

exports.addSession = (req, res) => {
    console.log(req.params.id);
    var id = req.params.id;
    console.log(req.body.Session);
    db.students.findByIdAndUpdate(id,  {$addToSet: {SessionsScheduled:  req.body.Session}}
        ,
                            function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated User : ", docs);
    }
})
    // db.students.updateOne(
    //     {"_id" : req.params.id},
    //     {$push: {SessionsScheduled:  req.body.Session}}
    // );
    console.log("Done");
      };
exports.registerattendance = (req, res) => {
    console.log("HEre");
    console.log(req.params);
    console.log(req.body);
    db.students.updateOne(
        { _id:  req.params.id },
        { $addToSet: { SessionsAttended: req.body.ID } }
    )
    .then(data => {
        console.log(data),

      res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while adding sessions"
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