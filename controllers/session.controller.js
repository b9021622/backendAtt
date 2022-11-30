const { sessions } = require("../models");
const db = require("../models");
const Session = db.sessions;
// Create and Save a new Animal
exports.create = (req, res) => {
    // Validate request
    if (!req.body.SessionID) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    
    console.log("req.body");
    console.log(req.body);
    // Create a Animal model object
    const session = new Session({
      SessionID: req.body.SessionID,
      SessionName: req.body.SessionName,
      Lecturer: req.body.Lecturer,
      SessionType: req.body.SessionType,
      SessionDate: req.body.SessionDate,
      Length: req.body.Length,
      SessionModule: req.body.SessionModule,
      StudentsScheduled: req.body.StudentsScheduled,
      AttendanceCode: req.body.attendanceCode,
    });
   
    console.log(session);
    session
      .save()
      .then(data => {
        console.log("session saved in the database: " + data);
        db.modules.findByIdAndUpdate(
          req.body.SessionModule,  //We assume userid is an attribute in the JSON
          { $push: { Sessions: data._id } },
          { new: true, useFindAndModify: false }
        
        ).then(data => {
          //console.log(`The updated module: ${data}`);
          // Returning the new animal
          //res.send(data);
        });
        //res.redirect('/session/sessions');
        res.send(data);
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
    const name = req.query.SessionName;
    console.log(req.body);
    //We use req.query.name to get query string from the Request and consider it as condition for findAll() method.
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
     Session
      .find(condition)
      .then(data => {
        // res.render('sessions',
        //   {title: 'sessions list',
        //    sessions: data});
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving sessions."
        });
      });
   };

  exports.addStudents = (req, res) => {
  db.sessions.updateOne(
    { SessionID:  req.body.SessionID },
    { $push: { StudentsScheduled: req.body.StudentID } }
  )
  .catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving Modules."
  });
  });
  };

  exports.ConfirmStudentAttendance = (req, res) => {
    db.sessions.updateOne(
      { SessionID:  req.body.SessionID },
      { $push: { StudentsAttended: req.body.StudentID } }
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
  const SessionID = req.params.id;
  console.log(SessionID);
  var condition = SessionID ? { _id: SessionID} : {};
db.sessions
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

exports.bycodefindOne = (req, res) => {
  console.log(req.params);
  const SessionID = req.params.id;
  console.log(SessionID);
  var condition = SessionID ? { AttendanceCode: SessionID} : {};
db.sessions
.find(condition)
.then(data => {
  if(!data.length){
    console.log("Empty");
    res.send("Empty");
  }
  else{
    console.log(data),
    // res.render('MySessions',
    //   {title: 'sessions',
    //    sessions: data});
    res.send(data);
  }
 
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
  const SessionID = req.params.id;
 // modules.deleteOne({_id: ModuleID});
 var condition = SessionID ? { _id: SessionID} : {};
 //var myquery = { "_id": new mongoose.Types.ObjectId(ModuleID)};
 console.log(condition);
 console.log(req.body);
 sessions.findByIdAndUpdate(SessionID, req.body, function (err, docs) {
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
  const SessionID = req.params.id;
 // modules.deleteOne({_id: ModuleID});
 var condition = SessionID ? { _id: SessionID} : {};
 //var myquery = { "_id": new mongoose.Types.ObjectId(ModuleID)};
 console.log(condition);
sessions.findByIdAndRemove(SessionID, function (err, docs) {
  if (err){
      console.log(err)
  }
  else{
      console.log("Removed User : ", docs);
  }});
};
 
// Delete all Animal from the database.
exports.deleteAll = (req, res) => {
 
};