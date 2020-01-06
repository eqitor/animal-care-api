//instance of database connection
var db = require('./db_connection');

//returning all elements of Uzytkownik table
module.exports.get_all = (req,res) => {

    let query = 'SELECT * FROM Uzytkownik';

    db.instance.query(query, (err,rows,fields) => {
        res.send(rows);
    })  
};

//returning element of Uzytkownik table with selected idUzytkownik parameter
module.exports.get_by_id = (req,res) => {

    let query = `SELECT * FROM Uzytkownik
                 WHERE idUzytkownik = ${req.params.id}`;

    db.instance.query(query, (err,rows,fields) => {
        res.send(rows);
    })  
};