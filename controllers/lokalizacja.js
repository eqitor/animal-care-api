//instance of database connection
var db = require('./db_connection');

//instance of joi validation
var Joi = require('joi');
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

//deleting element of Lokalizacja table with selected idLokalizacja parameter
module.exports.delete_by_id = (req, res) => {

    let query = `SELECT * FROM Lokalizacja WHERE idLokalizacja = ${req.params.id}`;

    db.instance.query(query, (err, rows, fields) => {

        if (rows === undefined || rows.toString() == '') {
            res.status(400).send('Localisation doesn\'t exist in current database');
        }
        else {

            let insert_query = `DELETE FROM Lokalizacja WHERE idLokalizacja = ${req.params.id}`;

            db.instance.query(insert_query, (err, rows, fields) => {
                if (err) {
                    res.status(400).send(`Database error occured: ${err}`);
                    return;
                }
                else {
                    res.status(200).send(`Localisation removed: ${JSON.stringify(req.params)}`);
                    console.log(`Localisation removed: ${req.params.id}`);
                }
            })

        }
    })
};

//adding new element of Lokalizacja table
module.exports.add = (req, res) => {

    const schema = Joi.object().keys({
        city: Joi.string().alphanum().max(45).required(),
        postCode: Joi.string().min(6).max(6).pattern(/([0-9]{2})-([0-9]{3})/),
    });

    const result = Joi.validate(req.body, schema);
    if (result.error) {
        //404 Bad Request
        res.status(400).send(`Validation error occured: ${result.error.details[0].message}`);
        return;
    }

    const new_localisation = {
        city: req.body.city,
        postCode: req.body.postCode
    };

    let insert_query = `INSERT INTO Lokalizacja (miasto, kodPocztowy) VALUES ('${new_localisation.city}', '${new_localisation.postCode}')`
    db.instance.query(insert_query, (err, rows, fields) => {
        if (err) {
            res.status(400).send(`Database error occured: ${err}`);
            return;
        }
        else {
            res.status(200).send(`Localisation added: ${JSON.stringify(new_localisation)}`);
            console.log(`Localisation added: ${new_localisation.city}`);
        }
    })
}