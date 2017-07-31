var path = require("path");
var express = require("express");
var router = express.Router();
// var app = express();

// Import the model (burgers.js) to use its database functions. 
// var Burger = require("../models");
var db = require("../models/burgers.js");

//selectAll
router.get("/", function(req, res) {
  
  db.Burger.findAll({}).then(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

//insertOne
router.post("/burgers", function(req, res) {

  db.Burger.create({
    burger_name: reg.body.burger_name,
    devoured: reg.body.devoured
  }).then(function(data) {
    res.redirect("/")
  });
});

//updateOne
router.put("/burgers/:id", function(req, res) {
	// var condition = "id = " + req.params.id;

	db.Burger.update(req.body,
  {
    where: {
      id: req.params.id
    }
  }).then(function(data) {
		res.redirect("/")
	});
});

// Export routes for server.js to use.
module.exports = router;