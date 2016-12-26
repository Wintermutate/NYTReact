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

mongoose.connect("mongodb://localhost/NYTReact");

var db = mongoose.connection;

db.on("error", (err) => {
	console.log("Mongoose Error: ", err);
});

db.once("open", () => {
	console.log("Mongoose connection succesful.")
});

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});

app.get("/api", (req, res) => {

	Article.find({}).sort(["date", "descending"]).limit(5).exec((err, doc) => {
		if(err){
			throw err;
			console.log(err);
		} else {
			res.json(doc);
		}
	});
});

app.post("/api", (req, res) => {
	let title = req.body.title;
	let url = req.body.url;
	let date = req.body.date;

	let article = {title, date, url};

	Article.update({$and: [{title: title}, {url: url}]},{$setOnInsert: article}, {upsert: true}, (err, doc) => {
    if(err){
    	throw err;
    	console.log(err);
    } else {
    	res.json(doc);
    }
   
  });
});

app.delete("/api/:id", (req, res) => {
	let id = mongoose.Types.ObjectId(req.params.id);
  Article.findByIdAndRemove(id, (err, doc) => {
    res.send(doc);
  })
})

app.listen(PORT);