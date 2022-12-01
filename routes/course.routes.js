var express = require('express');
var router = express.Router();
 
var courseController = require('../controllers/course.controller');

router.get('/', function(req, res, next) {
 res.json({message: "Welcome to the course api."});
});
 
router.post("/courses/", courseController.create);
router.post("/courses/addMod", courseController.addModule);
 
router.get("/courses/", courseController.findAll);
 
router.get("/courses/:id", courseController.findOne);
 
router.put("/courses/:id", courseController.update);
 
router.delete("/courses/:id", courseController.delete);
 
router.delete("/courses/", courseController.deleteAll);
 
module.exports = router;