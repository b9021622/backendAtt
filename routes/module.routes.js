var express = require('express');
var router = express.Router();
const { authjwt } = require("../middlewares");
//Require controller
var moduleController = require('../controllers/module.controller');
// GET at the root returns a welcome message in json
router.get('/', function(req, res, next) {
 res.json({message: "Welcome to the module api."});
});
 
// Create a new animal
router.post("/modules/", moduleController.create);
 
// Retrieve all animals
router.get("/modules/",moduleController.findAll);
 
// Retrieve a single animal with id
router.get("/modules/:id", moduleController.findOne);
 
// Update a animal with id
router.put("/modules/:id", moduleController.update);


router.post("/modules/add/", moduleController.addLecturer);
router.post("/modules/addstudent/", moduleController.addStudents);
// Delete a animal with id
router.delete("/modules/:id", moduleController.delete);
// Delete all animals of the database
router.delete("/modules/", moduleController.deleteAll);
 
module.exports = router;