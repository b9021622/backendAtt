const db = require("../models");
const AttCode = db.attcodes;

exports.create = (req, res) => {
    console.log("eq.body");
    console.log(req.body);
    const attCode = new AttCode({
      Code: req.body.Code
    });
    console.log("here" + attCode);
    attCode
      .save()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Code."
        });
      });
   };
exports.findOne = (req, res) => {
    const Code = req.params.id;
    console.log(Code);
    var condition = Code ? { Code: Code} : {};
  db.attcodes
  .find(condition)
  .then(data => {
    console.log(data),
  res.send(data);
  })
  .catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving Code."
  });
  });
  };