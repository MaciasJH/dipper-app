var express = require('express');
var app = express();
var port = process.env.port || 1337;
 
var clienteControllador = require('./ControladorClientes')();
var piezaControllador = require('./ControladorPiezas')();
var juegoControllador = require('./ControladorJuegos')();
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
const cors = require('cors')
var whitelist = ['http://localhost','http://187.234.58.207', 'http://diperventa.zapto.org', 'http://localhost:4200']
var corsOptions = {
  origin: function (origin, callback){
    if(whitelist.indexOf(origin)!== -1){
      callback(null, true)
    } else {
      callback(new Error('No permitido por CORS'))
    }
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions))



app.use("/api/clientes", clienteControllador);
app.use("/api/piezas", piezaControllador); 
app.use("/api/juegos", juegoControllador); 
app.listen(port, function () {
    var datetime = new Date();
    var message = "Server runnning on Port:- " + port + " Started at :- " + datetime;
    console.log(message);
});