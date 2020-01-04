//instance of database connection
var db = require('./db_connection');

//returning all elements of Plan table
module.exports.get_all = (req,res) => {

    let query = 'SELECT * FROM Plan';

    db.instance.query(query, (err,rows,fields) => {
        res.send(rows);
    })  
};

//returning element of Plan table with selected idPlan parameter
module.exports.get_by_id = (req,res) => {

    let query = `SELECT * FROM Plan
                 WHERE idPlan = ${req.params.id}`;

    db.instance.query(query, (err,rows,fields) => {
        res.send(rows);
    })  
};