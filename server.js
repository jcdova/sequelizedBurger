var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var path = require("path");

var port = process.env.PORT || 3000;

var app = express();

//require our models for syncing
var db = require("./models");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

// app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller.js");
// require("./controllers/burgers_controller.js")(app);

app.use("/", routes);

// app.listen(port, function() {
// 	console.log("App listening on PORT: " + port);
// })

//syncing our sequelize models and then starting our Express app
db.sequelize.sync().then (function() {
	app.listen(port, function() {
		console.log("App listening on PORT " + port);
	});
});