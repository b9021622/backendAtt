const db = require("../models");
const Student = db.students;

exports.create = (req, res) => {
      if (!req.body.StudentFName) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    
    const student = new Student({
    StudentID: req.body.StudentID,
    StudentFName: req.body.StudentFName,
    StudentSName: req.body.StudentSName,
    StudentPassword: req.body.StudentPassword
    });
    
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

exports.findAll = (req, res) => {
    const name = req.query.StudentFName;

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


exports.update = (req, res) => {
 
};
 
exports.delete = (req, res) => {
 
};
 
exports.deleteAll = (req, res) => {
 
};