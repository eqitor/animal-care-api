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

//deleting element of Wiadomosc table with selected idWiadomosc parameter
module.exports.delete_by_id = (req, res) => {

    let query = `SELECT * FROM Wiadomosc WHERE idWiadomosc = ${req.params.id}`;

    db.instance.query(query, (err, rows, fields) => {

        if (rows === undefined || rows.toString() == '') {
            res.status(400).send('Message doesn\'t exist in current database.');
        }
        else {

            let insert_query = `DELETE FROM Wiadomosc WHERE idWiadomosc = ${req.params.id}`;

            db.instance.query(insert_query, (err, rows, fields) => {
                if (err) {
                    res.status(400).send(`Database error occured: ${err}`);
                    return;
                }
                else {
                    res.status(200).send(`Message removed: ${JSON.stringify(req.params)}`);
                    console.log(`Message removed: ${req.params.id}`);
                }
            })

        }
    })
};

//adding new element of Wiadomosc table
module.exports.add = (req, res) => {

    const schema = Joi.object().keys({
        content: Joi.string().max(1000).required(),
        idOffer: Joi.number().max(99999999999).required(),
    });

    const result = Joi.validate(req.body, schema);
    if (result.error) {
        //404 Bad Request
        res.status(400).send(`Validation error occured: ${result.error.details[0].message}`);
        return;
    }

    const new_message = {
        content: req.body.content,
        idOffer: req.body.idOffer
    };

    let query = `SELECT * FROM Oferta WHERE id = '${new_message.idOffer}'`;
    db.instance.query(query, (err, rows, fields) => {

        if (rows == undefined || rows.toString() == '') {
            res.status(400).send('Offer doesn\'t exist in current database.');
            return;
        }
        else {

            let insert_query = `INSERT INTO Wiadomosc (tresc, Oferta_idOferta) VALUES ('${new_message.content}', '${new_message.idOffer}')`;
            db.instance.query(insert_query, (err, rows, fields) => {
                if (err) {
                    res.status(400).send(`Database error occured: ${err}`);
                    return;
                }
                else {
                    res.status(200).send(`Message added: ${JSON.stringify(new_offer)}`);
                    console.log(`Message added.`);
                }
            })
        }
    })
};