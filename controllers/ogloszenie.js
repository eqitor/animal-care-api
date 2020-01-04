//instance of database connection
var db = require('./db_connection');

//returning all elements of Ogloszenie table
module.exports.get_all = (req,res) => {

    let query = 'SELECT * FROM Ogloszenie';

    db.instance.query(query, (err,rows,fields) => {
        res.send(rows);
    })  
};

//returning element of Ogloszenie table with selected idOgloszenie parameter
module.exports.get_by_id = (req,res) => {

    let query = `SELECT * FROM Ogloszenie
                 WHERE idOgloszenie = ${req.params.id}`;

    db.instance.query(query, (err,rows,fields) => {
        res.send(rows);
    })  
};