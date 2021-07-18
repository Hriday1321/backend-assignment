var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Invoice = require("./models/invoice");
var seedDB = require("./seed")

var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = require("jquery")(window);

mongoose.connect("mongodb://localhost:27017/invoice-app", {useNewUrlParser: true, useUnifiedTopology: true});
seedDB();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.use("/", require("./routes/api"))

app.listen(process.env.PORT, process.env.IP, function(){
 console.log("server started");
})
