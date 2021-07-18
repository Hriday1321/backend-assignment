var express = require("express");
var router = express.Router();

var Invoice = require("../models/invoice")

router.get("/", function(req, res){
    res.render("home.ejs");
})

router.get("/invoices", function(req, res){
    Invoice.find({}, function(err, data){
        if(err){
            console.log(err)
        }else {
            res.render("invoices.ejs", {invoices: data});
        }
    })
})

router.post("/invoices", function(req, res){
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

router.get("/invoices/new", function(req, res){
    res.render("form.ejs");
})

router.get("/invoice/:id", function(req, res){
    Invoice.findById(req.params.id, function(err, data){
        if(err){
            console.log(err)
        } else{
            res.send(data);
        }
    });
})

//couldnt incorporate put into ejs
router.post("/invoice/:id", function(req, res){
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

module.exports = router;