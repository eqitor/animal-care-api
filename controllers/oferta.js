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

//deleting element of Oferta table with selected idOferta parameter
module.exports.delete_by_id = (req, res) => {

    let query = `SELECT * FROM Oferta WHERE idOferta = ${req.params.id}`;

    db.instance.query(query, (err, rows, fields) => {

        if (rows === undefined || rows.toString() == '') {
            res.status(400).send('Offer doesn\'t exist in current database.');
        }
        else {

            let insert_query = `DELETE FROM Oferta WHERE idOferta = ${req.params.id}`;

            db.instance.query(insert_query, (err, rows, fields) => {
                if (err) {
                    res.status(400).send(`Database error occured: ${err}`);
                    return;
                }
                else {
                    res.status(200).send(`Offer removed: ${JSON.stringify(req.params)}`);
                    console.log(`Offer removed: ${req.params.id}`);
                }
            })

        }
    })
};

//adding new element of Oferta table
module.exports.add = (req, res) => {

    const schema = Joi.object().keys({
        status: Joi.string().max(45),
        idUser: Joi.number().max(99999999999).required(),
    });

    const result = Joi.validate(req.body, schema);
    if (result.error) {
        //404 Bad Request
        res.status(400).send(`Validation error occured: ${result.error.details[0].message}`);
        return;
    }

    const new_offer = {
        status: req.body.city,
        idUser: req.body.idUser
    };

    let query = `SELECT * FROM Uzytkownik WHERE idUzytkownik = '${new_offer.idUser}'`;
    db.instance.query(query, (err, rows, fields) => {

        if (rows == undefined || rows.toString() == '') {
            res.status(400).send('User doesn\'t exist in current database.');
            return;
        }
        else {

            let insert_query = `INSERT INTO Oferta (status, Uzytkownik_idUzytkownik) VALUES ('${new_offer.status}', '${new_offer.idUser}')`;
            db.instance.query(insert_query, (err, rows, fields) => {
                if (err) {
                    res.status(400).send(`Database error occured: ${err}`);
                    return;
                }
                else {
                    res.status(200).send(`Offer added: ${JSON.stringify(new_offer)}`);
                    console.log(`Offer added.`);
                }
            })
        }
    })
};