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

//deleting element of Ogloszenie table with selected idOgloszenie parameter
module.exports.delete_by_id = (req, res) => {

    let query = `SELECT * FROM Ogloszenie WHERE idOgloszenie = ${req.params.id}`;

    db.instance.query(query, (err, rows, fields) => {

        if (rows === undefined || rows.toString() == '') {
            res.status(400).send('Announcement doesn\'t exist in current database.');
        }
        else {

            let insert_query = `DELETE FROM Ogloszenie WHERE idOgloszenie = ${req.params.id}`;

            db.instance.query(insert_query, (err, rows, fields) => {
                if (err) {
                    res.status(400).send(`Database error occured: ${err}`);
                    return;
                }
                else {
                    res.status(200).send(`Announcement removed: ${JSON.stringify(req.params)}`);
                    console.log(`Announcement removed: ${req.params.id}`);
                }
            })

        }
    })
};

module.exports.add_whole = (req, res) => {
    var addedDate = req.body.addedTimeSpan / 1000;
    var expiredDate = req.body.expiredTimeSpan / 1000;
    var err1, err2, err3;
    let query1 = `INSERT INTO Lokalizacja (kodPocztowy, miasto) VALUES ('${req.body.localisation.postCode}', '${req.body.localisation.city}')`;
    mysqlConnection.query(query1, (err, rows, fields) => {
        err1 = err;
        if (err) return;
        else {
            let query2 = `INSERT INTO Ogloszenie (tresc, dataPrzyjecia, dataAkceptacji, idLokalizacja) SELECT '${req.body.content}', '${req.body.addedDate}', '${req.body.acceptedDate}', MAX(idLokalizacja) FROM Lokalizacja`;
            mysqlConnection.query(query2, (err, rows, fields) => {
                err2 = err;
                if (err) return;
                else {
                    var animals = req.body.animals;
                    for (var animal of animals) {
                        mysqlConnection.query(`INSERT INTO Opieka (idZwierze, idOgloszenie) SELECT '${animal}', MAX(idOgloszenie) FROM Ogloszenie`, (err, rows, fields) => {
                            err3 = err;
                            if (err) return
                            else {
                                var terms = req.body.terms
                                for (var term of terms) {
                                    mysqlConnection.query(`INSERT INTO Termin (data, idOgloszenie) SELECT '${term}', MAX(idOgloszenie) FROM Ogloszenie`, (err, rows, fields) => {
                                        err4 = err;
                                        if (err) return;
                                    })
                                }
                            }
                        })
                    }
                }
            })
        }
    })
};

//adding new element of Ogloszenie table
module.exports.add = (req, res) => {

    const schema = Joi.object().keys({
        title: Joi.string().max(45).required(),
        content: Joi.string().max(1000),
        addedTimeSpan: Joi.number().required(),
        expiredTimeSpan: Joi.number().required(),
        idLocalisation: Joi.number().max(99999999999).required(),
    });

    const result = Joi.validate(req.body, schema);
    if (result.error) {
        //404 Bad Request
        res.status(400).send(`Validation error occured: ${result.error.details[0].message}`);
        return;
    }

    const new_announcement = {
        title: req.body.title,
        content: req.body.content,
        addedTimeSpan: req.body.addedTimeSpan,
        expiredTimeSpan: req.body.expiredTimeSpan,
        idLocalisation: req.body.idLocalisation
    };

    new_announcement.addedTimeSpan = new_announcement.addedTimeSpan / 1000;
    new_announcement.expiredTimeSpan = new_announcement.expiredTimeSpan / 1000;

    let query = `SELECT * FROM Localisation WHERE idLokalizacja = '${new_announcement.idLocalisation}'`;
    db.instance.query(query, (err, rows, fields) => {

        if (rows == undefined || rows.toString() == '') {
            res.status(400).send('Localisation doesn\'t exist in current database.');
            return;
        }
        else {

            let insert_query = `INSERT INTO Ogloszenie (tytul, tresc, dataDodania, dataPrzyjecia, dataWygasniecia) VALUES ('${new_announcement.title}', '${new_announcement.content}', FROM_UNIXTIME('${new_announcement.addedTimeSpan}'), FROM_UNIXTIME('${new_announcement.expiredTimeSpan}'))`;
            db.instance.query(insert_query, (err, rows, fields) => {
                if (err) {
                    res.status(400).send(`Database error occured: ${err}`);
                    return;
                }
                else {
                    res.status(200).send(`Offer added: ${JSON.stringify(new_announcement)}`);
                    console.log(`Offer added.`);
                }
            })
        }
    })
};
