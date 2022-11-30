const { sessions } = require("../models");
const db = require("../models");
const Session = db.sessions;
exports.create = (req, res) => {
    if (!req.body.SessionID) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    
    console.log("req.body");
    console.log(req.body);
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
          req.body.SessionModule, 
          { $push: { Sessions: data._id } },
          { new: true, useFindAndModify: false }
        
        ).then(data => {
          //console.log(`The updated module: ${data}`);
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

exports.findAll = (req, res) => {
    const name = req.query.SessionName;
    console.log(req.body);
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
      err.message || "Some error occurred while retrieving Session."
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
        err.message || "Some error occurred while retrieving Session."
    });
    });
    };
 
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
 
 
exports.update = (req, res) => {
  const SessionID = req.params.id;
 var condition = SessionID ? { _id: SessionID} : {};
 console.log(condition);
 console.log(req.body);
 sessions.findByIdAndUpdate(SessionID, req.body, function (err, docs) {
  if (err){
      console.log(err)
  }
  else{
      console.log("Removed Session : ", docs);
  }});
  res.send("Updated");
};
 
exports.delete = (req, res) => {
  const SessionID = req.params.id;
 var condition = SessionID ? { _id: SessionID} : {};
 console.log(condition);
sessions.findByIdAndRemove(SessionID, function (err, docs) {
  if (err){
      console.log(err)
  }
  else{
      console.log("Removed Session : ", docs);
  }});
};
 
exports.deleteAll = (req, res) => {
 
};