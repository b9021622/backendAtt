const dbConfig = require("../config/db.config.js");
 
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
 
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.animals = require("./animal.model.js")(mongoose);
db.courses = require("./course.model.js")(mongoose);
db.modules = require("./module.model.js")(mongoose);
db.sessions = require("./session.model.js")(mongoose); 
db.lecturers = require("./lecturer.model.js")(mongoose); 
db.students = require("./student.model.js")(mongoose); 
db.attcodes = require("./AttCode.model")(mongoose);
module.exports = db; 