var mongoose = require("mongoose");
var invoice = require("./models/invoice")

var data = [
        {
            to: "1",
            from: "internship",
            notes: "pay",
            due: "2021-07-20",
            status: "due",
            items: [
                {
                    name: "Borgir",
                    cost: "1700"
                },
                {
                    name: "Pizza",
                    cost: "1800"
                }
            ]
        },
        {
            to: "2",
            from: "internship",
            notes: "pay",
            due: "2021-07-22",
            status: "due",
            items: [
                {
                    name: "Borgir",
                    cost: "1700"
                },
                {
                    name: "Pizza",
                    cost: "1800"
                }
            ]
        }
    ];
    
    function seedDB(){
        invoice.remove({}, function(err){
            if(err)
                console.log(err);
            else{
                console.log("removed all invoices");
                data.forEach(function(seed){
                    invoice.create(seed, function(err, data){
                        if(err)
                            console.log(err);
                        else {
                            console.log("added invoice");
                        }
                    })
                })
            }
        })
    }
    
    module.exports = seedDB;