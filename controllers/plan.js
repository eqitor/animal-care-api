//instance of database connection
var db = require('./db_connection');

//returning all elements of Plan table
module.exports.get_all = (req,res) => {

    let query = 'SELECT * FROM Plan';

    db.instance.query(query, (err,rows,fields) => {
        res.send(rows);
    })  
};

//returning element of Plan table with selected idPlan parameter
module.exports.get_by_id = (req,res) => {

    let query = `SELECT * FROM Plan
                 WHERE idPlan = ${req.params.id}`;

    db.instance.query(query, (err,rows,fields) => {
        res.send(rows);
    })  
};

//deleting element of Plan table with selected idPlan parameter
module.exports.delete_by_id = (req, res) => {

    let query = `SELECT * FROM Plan WHERE idPlan = ${req.params.id}`;

    db.instance.query(query, (err, rows, fields) => {

        if (rows === undefined || rows.toString() == '') {
            res.status(400).send('Plan doesn\'t exist in the current database.');
        }
        else {

            let insert_query = `DELETE FROM Plan WHERE idPlan = ${req.params.id}`;

            db.instance.query(insert_query, (err, rows, fields) => {
                if (err) {
                    res.status(400).send(`Database error occured: ${err}`);
                    return;
                }
                else {
                    res.status(200).send(`Plan removed: ${JSON.stringify(req.params)}`);
                    console.log(`Plan removed: ${req.params.id}`);
                }
            })

        }
    })
};

//adding new element of Plan table
module.exports.add = (req, res) => {

    const schema = Joi.object().keys({
        idOffer: Joi.number().max(99999999999).required(),
        idDate: Joi.number().max(99999999999).required()
    });

    const result = Joi.validate(req.body, schema);
    if (result.error) {
        //404 Bad Request
        res.status(400).send(`Validation error occured: ${result.error.details[0].message}`);
        return;
    }

    const new_plan = {
        idOffer: req.body.idOffer,
        idDate: req.body.idDate
    };

    let query = `SELECT * FROM Oferta WHERE idOferta = '${new_plan.idOffer}'`;
    db.instance.query(query, (err, rows, fields) => {

        if (rows == undefined || rows.toString() == '') {
            res.status(400).send('Offer doesn\'t exist in current database.');
            return;
        }
        let query1 = `SELECT * FROM Termin WHERE id = '${new_plan.idDate}'`;
        db.instance.query(query1, (err, rows, fields) => {
            if (rows == undefined || rows.toString() == '') {
                res.status(400).send('Date doesn\'t exist in current database.');
                return;
            }
            else {
                let insert_query = `INSERT INTO Plan (Oferta_idOferta, Termin_idTermin) VALUES ('${new_plan.idOffer}', '${new_plan.idDate}')`
                db.instance.query(insert_query, (err, rows, fields) => {
                    if (err) {
                        res.status(400).send(`Database error occured: ${err}`);
                        return;
                    }
                    else {
                        res.status(200).send(`Plan added: ${JSON.stringify(new_offer)}`);
                        console.log(`Plan added.`);
                    }
                })
            }
        })
    })
};