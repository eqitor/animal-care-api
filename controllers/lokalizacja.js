//instance of database connection
var db = require('./db_connection');

//returning all elements of Lokalizacja table
module.exports.get_all = (req,res) => {

    let query = 'SELECT * FROM Lokalizacja';

    db.instance.query(query, (err,rows,fields) => {
        res.send(rows);
    })  
};

//returning element of Lokalizacja table with selected idLokalizacja parameter
module.exports.get_by_id = (req,res) => {

    let query = `SELECT * FROM Lokalizacja
                 WHERE idLokalizacja = ${req.params.id}`;

    db.instance.query(query, (err,rows,fields) => {
        res.send(rows);
    })  
};