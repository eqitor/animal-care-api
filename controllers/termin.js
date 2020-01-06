//instance of database connection
var db = require('./db_connection');

//returning all elements of Termin table
module.exports.get_all = (req,res) => {

    let query = 'SELECT * FROM Termin';

    db.instance.query(query, (err,rows,fields) => {
        res.send(rows);
    })  
};

//returning element of Termin table with selected idTermin parameter
module.exports.get_by_id = (req,res) => {

    let query = `SELECT * FROM Termin
                 WHERE idTermin = ${req.params.id}`;

    db.instance.query(query, (err,rows,fields) => {
        res.send(rows);
    })  
};

//deleting element of Termin table with selected idTermin parameter
module.exports.delete_by_id = (req, res) => {

    let query = `SELECT * FROM Termin WHERE idTermin = ${req.params.id}`;

    db.instance.query(query, (err, rows, fields) => {

        if (rows === undefined || rows.toString() == '') {
            res.status(400).send('Date doesn\'t exist in current database.');
        }
        else {

            let insert_query = `DELETE FROM Termin WHERE idTermin = ${req.params.id}`;

            db.instance.query(insert_query, (err, rows, fields) => {
                if (err) {
                    res.status(400).send(`Database error occured: ${err}`);
                    return;
                }
                else {
                    res.status(200).send(`Date removed: ${JSON.stringify(req.params)}`);
                    console.log(`Date removed: ${req.params.id}`);
                }
            })

        }
    })
};

//adding new element of Termin table
module.exports.add = (req, res) => {

    const schema = Joi.object().keys({
        date: Joi.number().required(),
        idAnnouncement: Joi.number().max(99999999999).required(),
    });

    const result = Joi.validate(req.body, schema);
    if (result.error) {
        //404 Bad Request
        res.status(400).send(`Validation error occured: ${result.error.details[0].message}`);
        return;
    }

    const new_date = {
        date: req.body.date,
        idAnnouncement: req.body.idAnnouncement
    };

    var date1 = new_date.date / 1000;

    let query = `SELECT * FROM Ogloszenie WHERE idOgloszenie = '${new_date.idAnnouncement}'`;
    db.instance.query(query, (err, rows, fields) => {

        if (rows == undefined || rows.toString() == '') {
            res.status(400).send('Announcement doesn\'t exist in current database.');
            return;
        }
        else {

            let insert_query = `INSERT INTO Termin (data, Ogloszenie_idOgloszenie) VALUES DATE((FROM_UNIXTIME('${date1}'))), '${new_date.idAnnouncement})`;
            db.instance.query(insert_query, (err, rows, fields) => {
                if (err) {
                    res.status(400).send(`Database error occured: ${err}`);
                    return;
                }
                else {
                    res.status(200).send(`Date added: ${JSON.stringify(new_date)}`);
                    console.log(`Date added.`);
                }
            })
        }
    })
};