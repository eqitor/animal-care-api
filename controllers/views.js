//instance of database connection
var db = require('./db_connection');

module.exports.get_view = (req,res) => {
    let query = `SELECT * FROM ${req.params.view_param.replace(/\'/g,'')}`;
    db.instance.query(query, (err,rows,fields) => {
        res.send(rows);
    })  
}