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

app.get("/", function(req, res){
    res.render("home.ejs");
})

app.get("/invoices", function(req, res){
    Invoice.find({}, function(err, data){
        if(err){
            console.log(err)
        }else {
            res.render("invoices.ejs", {invoices: data});
        }
    })
})

app.post("/invoices", function(req, res){
    var invoice = {to:req.body.to, from:req.body.from, notes:req.body.notes, due:req.body.due, status:req.body.stat, items: []};
    for(var i=0; i < req.body.itemname.length; i++){
        var item = {name: '', price: '', misc: ''};
        item.name = req.body.itemname[i];
        item.cost = req.body.cost[i];
        item.misc = req.body.misc[i];
        invoice.items = [...invoice.items,item];
    }
    Invoice.create(invoice, function(err, data){
        if(err)
            console.log(err);
        else {
                console.log("added invoice");
            }
        res.redirect("/invoices");
    })
})

app.get("/invoices/new", function(req, res){
    res.render("form.ejs");
})

app.get("/invoice/:id", function(req, res){
    Invoice.findById(req.params.id, function(err, data){
        if(err){
            console.log(err)
        } else{
            res.send(data);
        }
    });
})

app.post("/invoice/:id", function(req, res){
    Invoice.findById(req.params.id, function(err, item){
        if(err){
            console.log(err)
        } else{
            item.status = req.body.stat;
            
            item.save(function(err){
                if(err){
                    console.log(err)
                }
                else{
                    res.redirect("/invoices")
                }
            });
        }
    });
})

app.listen(process.env.PORT, process.env.IP, function(){
 console.log("server started");
})
