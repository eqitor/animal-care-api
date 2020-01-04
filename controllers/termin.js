//instance of database connection
var db = require('./db_connection');

//returning all elements of Termin table
module.exports.get_all = (req,res) => {

    let query = 'SELECT * FROM Termin';

    db.instance.query(query, (err,rows,fields) => {
        res.send(rows);
    })  
};

//returning element of Termin table with selected idTermin parameter
module.exports.get_by_id = (req,res) => {

    let query = `SELECT * FROM Termin
                 WHERE idTermin = ${req.params.id}`;

    db.instance.query(query, (err,rows,fields) => {
        res.send(rows);
    })  
};