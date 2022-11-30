var express = require('express');
var router = express.Router();
const { authjwt } = require("../middlewares");
//Require controller
var lecturerController = require('../controllers/lecturer.controller');

// GET at the root returns a welcome message in json
router.get('/', function(req, res, next) {
 res.json({message: "Welcome to the lecturers api."});
});
 
// Create a new animal
router.post("/lecturers/", lecturerController.create);
 
// Retrieve all animals
router.get("/lecturers/", lecturerController.findAll);

router.get("/getSessions/:id",lecturerController.getSessions);
router.get("/getModules/:id",lecturerController.getModules);
// Retrieve a single animal with id
router.get("/lecturers/:id", lecturerController.findOne);
 
// Update a animal with id
router.put("/lecturers/:id", lecturerController.update);
 
// Delete a animal with id
router.delete("/lecturers/:id", lecturerController.delete);
 
// Delete all animals of the database
router.delete("/lecturers/", lecturerController.deleteAll);
 
module.exports = router;