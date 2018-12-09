var express = require('express');
var router = express.Router();
var sql = require("mssql");
var conn = require("./connect")();

var routes = function()
{
    
    router.route('/:idCliente')
        .get(function (req, res)
            {
                var idCliente=req.param('idCliente', 1)
                console.log("test es: "+ req.param('idCliente', 1))
                conn.connect().then(function ()
                {   
                    //consulta cliente
                    var sqlQuery = "SELECT * FROM CLN_CLientes WHERE Cln_Clave = " + idCliente+ ""
                    var req = new sql.Request(conn);
                    var rscliente;
                    req.query(sqlQuery).then(function (recordset)
                   
                    
                    {
                        rscliente = recordset
                        

                    
                    })
                        .catch(function (err){
                            conn.close();
                            res.status(400).send("Error while inserting data 1");
                        });

//separaciooooooooooooooooooooooooooooon

                    var sqlQuery2 = "SELECT Jgs_Clave, Jgs_Descripcion FROM JGS_Juegos WHERE EXISTS (SELECT 1 FROM   LPJ_DetalleListaPreciosJuegos WHERE  JGS_Juegos.Jgs_Clave = LPJ_DetalleListaPreciosJuegos.Jgs_Clave)"
                    var req2 = new sql.Request(conn);
                    var rsjuegos;
                    req2.query(sqlQuery2).then(function (recordset2)
                   
                    
                    {
                        rsjuegos = recordset2
                        

                    
                    })
                        .catch(function (err){
                            conn.close();
                            res.status(400).send("Error while inserting data 1");
                        });

//separaciooooooooooooooooooooooooooooon2
                    var sqlQuery3 = "SELECT Pzs_Clave, Pzs_Descripcion FROM PZS_Piezas WHERE EXISTS (SELECT 1 FROM   LPP_DetalleListaPreciosPiezas WHERE  PZS_Piezas.Pzs_Clave = LPP_DetalleListaPreciosPiezas.Pzs_Clave)"
                    var req3 = new sql.Request(conn);
                    var rspiezas
                    req3.query(sqlQuery3).then(function (recordset3)
                        
                    
                    {
                        rspiezas=recordset3
                        
                        res.json({cliente:rscliente.recordset, descjuegos:rsjuegos.recordset, descpiezas:rspiezas.recordset});
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