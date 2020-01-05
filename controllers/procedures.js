//instance of database connection
var db = require('./db_connection');

module.exports.get_db_procedure = (req, res) => {
    let query = `CALL ${req.params.procedure_param.replace(/\'/g,'')}`;
    db.instance.query(query, (err,rows,fields) => {
        res.send(rows);
    })
}