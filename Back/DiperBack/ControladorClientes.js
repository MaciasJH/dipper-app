var express = require('express');
var router = express.Router();
var sql = require("mssql");
var conn = require("./connect")();

var routes = function()
{
    router.route('/')
        .get(function (req, res)
        {
            conn.connect().then(function ()
            {   
                console.log("test es: ")
                var sqlQuery = "SELECT * FROM CLN_CLientes"
                var req = new sql.Request(conn);
                req.query(sqlQuery).then(function (recordset)
                {
                    res.json(recordset.recordset);
                    conn.close();
                })
                    .catch(function (err){
                        conn.close();
                        res.status(400).send("Error while inserting data 1");
                    });
            })
                .catch(function (err){
                conn.close();
                res.status(400).send("Error while inserting data 2");
                });
            });


    router.route('/:idCliente')
        .get(function (req, res)
            {
                var idCliente=req.param('idCliente', 1)
                console.log("test es: "+ req.param('idCliente', 1))
                conn.connect().then(function ()
                {   
                    
                    var sqlQuery = "SELECT * FROM CLN_CLientes WHERE Cln_Clave = " + idCliente+ ""
                    var req = new sql.Request(conn);
                    req.query(sqlQuery).then(function (recordset)
                    {
                        res.json(recordset.recordset);
                        conn.close();
                    })
                        .catch(function (err){
                            conn.close();
                            res.status(400).send("Error while inserting data 1");
                        });
                })
                    .catch(function (err){
                    conn.close();
                    res.status(400).send("Error while inserting data 2");
                    });
                });


        return router;    
        
          

};
module.exports = routes;