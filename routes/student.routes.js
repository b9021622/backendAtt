var express = require('express');
var router = express.Router();
//Require controller
var studentController = require('../controllers/student.controller');

// GET at the root returns a welcome message in json
router.get('/', function(req, res, next) {
 res.json({message: "Welcome to the lecturers api."});
});
 
// Create a new animal
router.post("/students/", studentController.create);
router.post("/add/:id", studentController.addSession);
router.post("/attended/:id", studentController.registerattendance);

router.get("/getModules/:id",studentController.getModules);


// Retrieve all animals
router.get("/students/", studentController.findAll);
 
// Retrieve a single animal with id
router.get("/students/:id", studentController.findOne);
 
// Update a animal with id
router.put("/students/:id", studentController.update);
 
// Delete a animal with id
router.delete("/students/:id", studentController.delete);
 
// Delete all animals of the database
router.delete("/students/", studentController.deleteAll);
 
module.exports = router;