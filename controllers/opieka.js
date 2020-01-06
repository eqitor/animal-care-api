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

//deleting element of Opieka table with selected idOpieka parameter
module.exports.delete_by_id = (req, res) => {

    let query = `SELECT * FROM Opieka WHERE idOpieka = ${req.params.id}`;

    db.instance.query(query, (err, rows, fields) => {

        if (rows === undefined || rows.toString() == '') {
            res.status(400).send('Care doesn\'t exist in the current database.');
        }
        else {

            let insert_query = `DELETE FROM Opieka WHERE idOpieka = ${req.params.id}`;

            db.instance.query(insert_query, (err, rows, fields) => {
                if (err) {
                    res.status(400).send(`Database error occured: ${err}`);
                    return;
                }
                else {
                    res.status(200).send(`Care removed: ${JSON.stringify(req.params)}`);
                    console.log(`Care removed: ${req.params.id}`);
                }
            })

        }
    })
};

//adding new element of Opieka table
module.exports.add = (req, res) => {

    const schema = Joi.object().keys({
        idAnnouncement: Joi.number().max(99999999999).required(),
        idAnimal: Joi.number().max(99999999999).required()
    });

    const result = Joi.validate(req.body, schema);
    if (result.error) {
        //404 Bad Request
        res.status(400).send(`Validation error occured: ${result.error.details[0].message}`);
        return;
    }

    const new_care = {
        idAnnouncement: req.body.idAnnouncement,
        idAnimal: req.body.idAnimal
    };

    let query = `SELECT * FROM Ogloszenie WHERE idOgloszenie = '${new_offer.idAnnouncement}'`;
    db.instance.query(query, (err, rows, fields) => {

        if (rows == undefined || rows.toString() == '') {
            res.status(400).send('Announcement doesn\'t exist in current database.');
        }
        let query1 = `SELECT * FROM Zwierze WHERE idZwierze = '${new_offer.idAnimal}'`;
        db.instance.query(query1, (err, rows, fields) => {
            if (rows == undefined || rows.toString() == '') {
                res.status(400).send('Animal doesn\'t exist in current database.');
            }
            else {

                let insert_query = `INSERT INTO Opieka (Ogloszenie_idOgloszenie, Zwierze_idZwierze) VALUES ('${new_care.idAnnouncement}', '${new_care.idAnnouncement}')`;
                db.instance.query(insert_query, (err, rows, fields) => {
                    if (err) {
                        res.status(400).send(`Database error occured: ${err}`);
                        return;
                    }
                    else {
                        res.status(200).send(`Care added: ${JSON.stringify(new_offer)}`);
                        console.log(`Care added.`);
                    }
                })
            }
        })
    })
};