var express = require('express');
var router = express.Router();
 
//Require controller
var courseController = require('../controllers/course.controller');

// GET at the root returns a welcome message in json
router.get('/', function(req, res, next) {
 res.json({message: "Welcome to the course api."});
});
 
// Create a new animal
router.post("/courses/", courseController.create);
router.post("/courses/addMod", courseController.addModule);
 
// Retrieve all animals
router.get("/courses/", courseController.findAll);
 
// Retrieve a single animal with id
router.get("/courses/:id", courseController.findOne);
 
// Update a animal with id
router.put("/courses/:id", courseController.update);
 
// Delete a animal with id
router.delete("/courses/:id", courseController.delete);
 
// Delete all animals of the database
router.delete("/courses/", courseController.deleteAll);
 
module.exports = router;