var express = require('express');
var app = express();
var port = process.env.port || 1337;
 
var clienteControllador = require('./ControladorClientes')();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
const cors = require('cors')

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions))



app.use("/api/clientes", clienteControllador);
 
app.listen(port, function () {
    var datetime = new Date();
    var message = "Server runnning on Port:- " + port + " Started at :- " + datetime;
    console.log(message);
});