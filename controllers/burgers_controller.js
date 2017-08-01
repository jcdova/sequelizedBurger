 
var db = require("../models");

module.exports = function(app) {

//selectAll
app.get("/", function(req, res) {
  
  db.Burger.findAll({}).then(function(data) {
    var hbsObject = {
      burgers: data
      // Burger: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

//insertOne
app.post("/burgers", function(req, res) {

  db.Burger.create({
    burger_name: req.body.burger_name,
    devoured: req.body.devoured
  }).then(function(data) {
    res.redirect("/")
  });
});

//updateOne
app.put("/burgers/:id", function(req, res) {
	// var condition = "id = " + req.params.id;

	db.Burger.update({
      burger_name: req.body.burger_name,
      // devoured: req.body.devoured
      devoured: req.body.devoured
    }, {
      where: {
        id: req.body.id
      }
  }).then(function(data) {
		res.redirect("/")
	});
});

}
