var sql = require("mssql");
var connect = function()
{
    var conn = new sql.ConnectionPool({
        user: 'test',
        password: 'qwerty',
        server: '192.168.1.70',
        database: 'DiperTest',
        port: 58895
    });
 
    return conn;
};

module.exports = connect;