//instance of database connection
var db = require('./db_connection');

var Joi = require('joi');

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
        
        res.send({
                id : rows[0].idZwierze,
                userId : rows[0].Uzytkownik_idUzytkownik,
                name : rows[0].imie,
                Spieces : rows[0].gatunek,
                age: rows[0].wiek,
                sex : (rows[0].plec != null ? (rows.plec[0] == 1 ?(true):(false)) : null)
        });
    })  
};

//deleting element of Zwierze table with selected idZwierze parameter
module.exports.delete_by_id = (req, res) => {

    let query = `SELECT * FROM Zwierze WHERE idZwierze = ${req.params.id}`;

    db.instance.query(query, (err, rows, fields) => {

        if (rows === undefined || rows.toString() == '') {
            res.status(400).send('Zwierze nie istnieje.');
        }
        else {

            let insert_query = `DELETE FROM Zwierze WHERE idZwierze = ${req.params.id}`;

            db.instance.query(insert_query, (err, rows, fields) => {
                if (err) {
                    res.status(400).send(`Database error occured: ${err}`);
                    return;
                }
                else {
                    res.status(200).send(`Animal removed: ${JSON.stringify(req.params)}`);
                    console.log(`Animal removed: ${req.params.id}`);
                }
            })

        }
    })
};

//adding new element of Zwierze table
module.exports.add = (req, res) => {

    const schema = Joi.object().keys({
        id : Joi.required(),
        Spieces: Joi.string().max(255).required(),
        age: Joi.number().max(9999999999),
        name: Joi.string().max(255).required(),
        sex : Joi.required(),
        idUser: Joi.number().max(99999999999)
    });

    const result = Joi.validate(req.body, schema);
    if (result.error) {
        //404 Bad Request
        res.status(400).send(`Validation error occured: ${result.error.details[0].message}`);
        console.log(`Validation error occured: ${result.error.details[0].message}`);
        return;
    }

    const new_animal = {
        species: req.body.Spieces,
        age: req.body.age,
        name: req.body.name,
        sex: req.body.sex,
        idUser: req.body.idUser
    };

    let query = `SELECT * FROM Uzytkownik WHERE idUzytkownik = '${new_animal.idUser}'`;
    db.instance.query(query, (err, rows, fields) => {

        if (rows == undefined || rows.toString() == '') {
            res.status(400).send('User doesn\'t exist in current database.');
            console.log('User doesn\'t exist in current database.')
            return;
        }
        else {

            let insert_query = `INSERT INTO Zwierze (gatunek, wiek, imie, plec, Uzytkownik_idUzytkownik) VALUES ('${new_animal.species}', '${new_animal.age}', '${new_animal.name}', b'${(new_animal.sex != null ? (new_animal.sex == true ?(1):(0)) : null)}', '${new_animal.idUser}')`;
            db.instance.query(insert_query, (err, rows, fields) => {
                if (err) {
                    res.status(400).send(`Database error occured: ${err}`);
                    console.log(`Database error occured: ${err}`);
                    return;
                }
                else {
                    res.status(200).send(`Animal added: ${JSON.stringify(new_animal)}`);
                    console.log(`Animal added.`);
                }
            })
        }
    })
};