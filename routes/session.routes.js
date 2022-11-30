var express = require('express');
var router = express.Router();
 
//Require controller
var sessionController = require('../controllers/session.controller');
var attCodeController = require('../controllers/AttCode.controller')
// GET at the root returns a welcome message in json
router.get('/', function(req, res, next) {
    res.json({message: "Welcome to the module api."});
   });
 
// Create a new animal
 router.post("/sessions/", sessionController.create);
 router.post("/code/", attCodeController.create);
 router.get("/code/:id", attCodeController.findOne);
 router.get("/bycode/:id", sessionController.bycodefindOne);
router.post("/sessions/addstu/", sessionController.addStudents);
router.post("/sessions/confirmstu", sessionController.ConfirmStudentAttendance);
// Retrieve all animals
router.get("/sessions/", sessionController.findAll);
 
// Retrieve a single animal with id
router.get("/sessions/:id", sessionController.findOne);
 
// Update a animal with id
router.put("/sessions/:id", sessionController.update);
 
// Delete a animal with id
router.delete("/sessions/:id", sessionController.delete);
 
// Delete all animals of the database
router.delete("/sessions/", sessionController.deleteAll);
 
module.exports = router;