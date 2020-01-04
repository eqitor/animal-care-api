//instance of database connection
var db = require('./db_connection');

//returning all elements of Wiadomosc table
module.exports.get_all = (req,res) => {

    let query = 'SELECT * FROM Wiadomosc';

    db.instance.query(query, (err,rows,fields) => {
        res.send(rows);
    })  
};

//returning element of Wiadomosc table with selected idWiadomosc parameter
module.exports.get_by_id = (req,res) => {

    let query = `SELECT * FROM Wiadomosc
                 WHERE idWiadomosc = ${req.params.id}`;

    db.instance.query(query, (err,rows,fields) => {
        res.send(rows);
    })  
};