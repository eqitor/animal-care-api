//instance of database connection
var db = require('./db_connection');

//returning all elements of Oferta table
module.exports.get_all = (req,res) => {

    let query = 'SELECT * FROM Oferta';

    db.instance.query(query, (err,rows,fields) => {
        res.send(rows);
    })  
};

//returning element of Oferta table with selected idOferta parameter
module.exports.get_by_id = (req,res) => {

    let query = `SELECT * FROM Oferta
                 WHERE idOferta = ${req.params.id}`;

    db.instance.query(query, (err,rows,fields) => {
        res.send(rows);
    })  
};