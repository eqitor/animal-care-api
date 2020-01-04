//instance of database connection
var db = require('./db_connection');

//returning all elements of Zwierze table
module.exports.get_all = (req,res) => {

    let query = 'SELECT * FROM Zwierze';

    db.instance.query(query, (err,rows,fields) => {
        res.send(rows);
    })  
};

//returning element of Zwierze table with selected idZwierze parameter
module.exports.get_by_id = (req,res) => {

    let query = `SELECT * FROM Zwierze
                 WHERE idZwierze = ${req.params.id}`;

    db.instance.query(query, (err,rows,fields) => {
        res.send(rows);
    })  
};