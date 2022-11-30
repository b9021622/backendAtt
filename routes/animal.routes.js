var express = require('express');
var router = express.Router();
 
//Require controller
var animalController = require('../controllers/animal.controller');

// GET at the root returns a welcome message in json
router.get('/', function(req, res, next) {
 res.json({message: "Welcome to the petshop api."});
});
 
// Create a new animal
router.post("/animals/", animalController.create);
 
// Retrieve all animals
router.get("/animals/", animalController.findAll);
 
// Retrieve a single animal with id
router.get("/animals/:id", animalController.findOne);
 
// Update a animal with id
router.put("/animals/:id", animalController.update);
 
// Delete a animal with id
router.delete("/animals/:id", animalController.delete);
 
// Delete all animals of the database
router.delete("/animals/", animalController.deleteAll);
 
module.exports = router;