var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var conn = require("./connect")();

console.log("entro aqui")
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'diper.venta@gmail.com',
        pass: 'adminventa'
        }                    
    });

exports.send = function (data, callback){
    let message = { 
        from: 'diper.venta@gmail.com',
        to: 'macias.joelh@gmail.com',
        subject: 'Venta via Web',
        text: 'Se ha generado una nueva venta a traves de la pagina web',      
         attachments: [
            {   // data uri as an attachment
                filename: "Venta.pdf",
                path: data
            }
        ]
    }
    
    transporter.sendMail(message, (error, info) => {
        if (error) {
            return console.log(error);
                callback(false);
            }
            callback(true);
        });
    }