//instance of database connection
var db = require('./db_connection');
var Joi = require('joi');
var loggedUsers = require('../contents/logged_users');

module.exports.login = (req,res) => {

    let query = `SELECT * FROM Uzytkownik
                 WHERE login = '${req.body.login}' AND haslo = '${req.body.password}'`;

    db.instance.query(query, (err,rows,fields) => {
        if(rows == ''){
            res.status(404).send({resultCode : 404,
                                  message : "Invalid login or password."});
            return;
        }
        if(loggedUsers.loggedUsers.is_logged(rows)){
            res.send(rows);
            return;
        }
        else{   
            loggedUsers.loggedUsers.add_user(rows);
            res.send(rows);
        }
       

})};

module.exports.logout = (req,res) => {

    loggedUsers.loggedUsers.remove_user(req.params.login);
    res.send({resultCode : 200,
              message : 'User has been logged out.'});
};

module.exports.validate = (req,res) => {

    if(loggedUsers.loggedUsers.is_logged(req.params.login)){
        res.status(200).send({resultCode : 200,
                              message : `User ${req.params.login} is logged in.`});
        return;
    }
    else{
        res.status(404).send({resultCode : 404,
                              message : `User ${req.params.login} is not logged in.`});
        return;
    }
};

module.exports.register = (req,res) => {

    const schema = Joi.object().keys({
        login: Joi.string().alphanum().min(3).max(30).required(),
        haslo: Joi.string().min(7).max(30).required(),
        nick: Joi.string().min(3).max(30).required(),
        numerTelefonu: Joi.number().min(99999999).max(999999999),
        email: Joi.string().email({minDomainAtoms: 2}).required()
    });

   
    const result = Joi.validate(req.body, schema);
    

    if(result.error){
        // 400 Bad Request
        res.status(400).send({resultCode : 400,
                              message : `Validation error occured: ${result.error.details[0].message}`});
        return;
    }
    
    
    const new_user = {
        login : req.body.login,
        haslo : req.body.haslo,
        nick : req.body.nick,
        numerTelefonu : req.body.numerTelefonu,
        email : req.body.email
    };

    
    let query = `SELECT * FROM Uzytkownik
                 WHERE login = '${new_user.login}'`;

    db.instance.query(query, (err, rows, fields) => {
      
        if(!(rows == undefined || rows.toString() == '')){
            res.status(400).send({resultCode : 400,
                                  message : 'User already exists in current database.'});
        }
        else {
            
            let insert_query = `INSERT INTO Uzytkownik (login,haslo,nick,numerTelefonu,email) 
                                VALUES ('${new_user.login}', '${new_user.haslo}', '${new_user.nick}', ${new_user.numerTelefonu}, '${new_user.email}')`
            
            db.instance.query(insert_query, (err,rows,fields) => {
                if(err){
                    res.status(400).send({resultCode : 400,
                                          message :`Database error occured: ${err}`});
                    return;
                }
                else{
                    res.status(200).send({resultCode : 200,
                                          message : `User added.`});
                    console.log(`New user added: ${new_user.login}`);
                }
            })

        }
    })

}

module.exports.remove_user = (req, res) =>{
    
    const schema = Joi.object().keys({
        login: Joi.string().alphanum().min(3).max(30).required(),
        haslo: Joi.string().min(7).max(30),
        nick: Joi.string().min(3).max(30),
        numerTelefonu: Joi.number().min(9),
        email: Joi.string().email({minDomainAtoms: 2})
    });

   
    const result = Joi.validate(req.body, schema);
    

    if(result.error){
        // 400 Bad Request
        res.status(400).send({resultCode : 400,
                              message : `Validation error occured: ${result.error.details[0].message}`});
        return;
    }

    let query = `SELECT * FROM Uzytkownik
                 WHERE login = '${req.body.login}'`;

    db.instance.query(query, (err, rows, fields) => {

        if(rows === undefined || rows.toString() == ''){
            res.status(400).send({resultCode : 400,
                                  message : 'User doesn\'t exists.'});
        }
        else {
            
            let insert_query = `DELETE FROM Uzytkownik 
                                WHERE login ='${req.body.login}'`
            
            db.instance.query(insert_query, (err,rows,fields) => {
                if(err){
                    res.status(400).send({resultCode : 400,
                                          message : `Database error occured: ${err}`});
                    return;
                }
                else{
                    res.status(200).send({resultCode : 200,
                                          message : `User removed.`});
                    console.log(`User removed: ${req.body.login}`);
                }
            })

        }
    })

}