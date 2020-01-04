//instance of database connection
var db = require('./db_connection');

//returning all elements of Opieka table
module.exports.get_all = (req,res) => {

    let query = 'SELECT * FROM Opieka';

    db.instance.query(query, (err,rows,fields) => {
        res.send(rows);
    })  
};

//returning element of Opieka table with selected idOpieka parameter
module.exports.get_by_id = (req,res) => {

    let query = `SELECT * FROM Opieka
                 WHERE idOpieka = ${req.params.id}`;

    db.instance.query(query, (err,rows,fields) => {
        res.send(rows);
    })  
};