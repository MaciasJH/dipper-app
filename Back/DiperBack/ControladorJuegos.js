var express = require('express');
var router = express.Router();
var sql = require("mssql");
var conn = require("./connect")();

var routes = function()
{
    //falta revisar si es pieza o juego
    router.route('/:idMueble/:listP')
        .get(function (req, res)
            {
                var idMueble=req.param('idMueble', 1)
                var listP=req.param('listP', 1)
                console.log("test es: "+ req.param('idMueble', 1)+listP)
                conn.connect().then(function ()
                {   
                    //consulta cliente                   
                    var sqlQuery = "SELECT Lpj_PrecioUnitario FROM LPJ_DetalleListaPreciosJuegos WHERE Lpr_Clave = "
                    + listP + "AND Jgs_Clave = '"+idMueble+"'"
                    var req = new sql.Request(conn);
                    var rspiezas
                    req.query(sqlQuery).then(function (recordset)
                        
                    
                    {
                        rspiezas=recordset
                        console.log(rspiezas.recordset)
                        res.json(rspiezas.recordset);
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