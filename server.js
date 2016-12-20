var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var Article = require("./models/Article");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

app.use(express.static("./public"));

mongoose.connect("mongodb:/localhost/NYTReact");

var db = mongoose.connection;

db.on("error", (err) => {
	console.log("Mongoose Error: ", err);
});

db.once("open", () => {
	console.log("Mongoose connection succesful.")
});

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
})