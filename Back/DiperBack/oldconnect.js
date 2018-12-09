var sql = require("mssql");
var connect = function()
{
    var conn = new sql.ConnectionPool({
        user: 'sa',
        password: '',
        server: '192.168.1.91',
        database: 'SISPLANER',

    });
 
    return conn;
};

module.exports = connect;