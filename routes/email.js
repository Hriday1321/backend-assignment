var nodemailer = require('nodemailer');
var express = require("express");
var router = express.Router();

var Invoice = require("../models/invoice")

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'my@gmail.com',
    pass: 'my'
  }
});


router.post("/:id", function(req, res){
    Invoice.findById(req.params.id, function(err, data){
        if(err){
            console.log(err)
        } else{
            var mailOptions = {
                from: 'my@gmail.com',
                to: 'hridaygupta100@hotmail.com',
                subject: 'Invoice',
                text: String(data)
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    });
    res.redirect("/invoices")
})

module.exports = router;