//instance of database connection
var db = require('./db_connection');

module.exports.get_advertisements_info = (req,res) => {
    let query = `SELECT Ogloszenie.idOgloszenie, Ogloszenie.tytul, Ogloszenie.tresc, UNIX_TIMESTAMP(dataPrzyjecia) AS dataPrzyjecia,
    UNIX_TIMESTAMP(dataWygasniecia) AS dataWygasniecia, Lokalizacja.idLokalizacja, Lokalizacja.miasto, Lokalizacja.kodPocztowy
    FROM Ogloszenie
    JOIN Lokalizacja ON Lokalizacja.idLokalizacja = Ogloszenie.Lokalizacja_idLokalizacja`;

    db.instance.query(query, (err, rows, fields) => {

        const schema = {
            object : []
        }

        rows.forEach(row => {
            
            schema.object.push({
                id : row.idOgloszenie,
                title : row.tytul,
                contents : row.tresc,
                addedTimeStamp : row.dataPrzyjecia,
                expirationTimeStamp : row.dataWygasniecia,

                localisation : {
                    id : row.idLokalizacja,
                    city : row.miasto,
                    postCode : row.kodPocztowy
                }
            })
        });

        res.send(schema);

    })
}

module.exports.get_advertisement_info = (req,res) => {
    let query = `SELECT Ogloszenie.idOgloszenie, Ogloszenie.tytul, Ogloszenie.tresc, UNIX_TIMESTAMP(dataPrzyjecia) AS dataPrzyjecia,
    UNIX_TIMESTAMP(dataWygasniecia) AS dataWygasniecia, Lokalizacja.idLokalizacja, Lokalizacja.miasto, Lokalizacja.kodPocztowy
    FROM Ogloszenie
    JOIN Lokalizacja ON Lokalizacja.idLokalizacja = Ogloszenie.Lokalizacja_idLokalizacja
    WHERE Ogloszenie.idOgloszenie = ${req.params.id}`;

    db.instance.query(query, (err, rows, fields) => {

        const schema = {
            object : []
        }

        rows.forEach(row => {
            
            schema.object.push({
                id : row.idOgloszenie,
                title : row.tytul,
                contents : row.tresc,
                addedTimeStamp : row.dataPrzyjecia,
                expirationTimeStamp : row.dataWygasniecia,

                localisation : {
                    id : row.idLokalizacja,
                    city : row.miasto,
                    postCode : row.kodPocztowy
                }
            })
        });

        res.send(schema);

    })
}

module.exports.get_deadline_info = (req, res) => {
    let query = `SELECT Termin.idTermin, unix_timestamp(Termin.data) AS data FROM Termin
    WHERE Ogloszenie_idOgloszenie = ${req.params.id}`;

    db.instance.query(query, (err, rows, fields) => {

        const schema = {
            object : []
        }

        rows.forEach(row => {
            
            schema.object.push({
                id : row.idTermin,
                timeStamp : row.data,
                isTaken : row.isTaken
                })
        });

        res.send(schema);

    })
}

module.exports.get_animals_of_user = (req, res) => {
    let query = `SELECT * FROM Zwierze
    WHERE Uzytkownik_idUzytkownik = ${req.params.id}`;

    db.instance.query(query, (err, rows, fields) => {

        const schema = {
            object : []
        }

        rows.forEach(row => {
            schema.object.push(JSON.parse(JSON.stringify({
                id : row.idZwierze,
                name : row.imie,
                Spieces : row.gatunek,
                age: row.wiek,
                sex : (row.plec != null ? (row.plec[0] == 1 ?(true):(false)) : null)
                })))

                
        });

        res.send(schema);

    })
}

module.exports.get_animals_of_advertisement = (req, res) => {
    let query = `SELECT * FROM Zwierze
    WHERE idZwierze IN (SELECT Opieka.Zwierze_idZwierze FROM Opieka
                        WHERE Opieka.Ogloszenie_idOgloszenie = ${req.params.id})`;

    db.instance.query(query, (err, rows, fields) => {

        const schema = {
            object : []
        }

        rows.forEach(row => {
            schema.object.push(JSON.parse(JSON.stringify({
                id : row.idZwierze,
                userId : row.Uzytkownik_idUzytkownik,
                name : row.imie,
                Spieces : row.gatunek,
                age: row.wiek,
                sex : (row.plec != null ? (row.plec[0] == 1 ?(true):(false)) : null)
                })))

                
        });

        res.send(schema);

    })
}

module.exports.get_advertisements_of_user = (req, res) => {
    let query = `SELECT Ogloszenie.idOgloszenie, Ogloszenie.tytul, Ogloszenie.tresc, UNIX_TIMESTAMP(dataPrzyjecia) AS dataPrzyjecia,
    UNIX_TIMESTAMP(dataWygasniecia) AS dataWygasniecia, Lokalizacja.idLokalizacja, Lokalizacja.miasto, Lokalizacja.kodPocztowy
    FROM Ogloszenie
    JOIN Lokalizacja ON Lokalizacja.idLokalizacja = Ogloszenie.Lokalizacja_idLokalizacja
    WHERE mydb.Ogloszenie.idOgloszenie IN (SELECT mydb.Opieka.Ogloszenie_idOgloszenie
                                           FROM mydb.Opieka
                                           WHERE mydb.Opieka.Zwierze_idZwierze IN (SELECT mydb.Zwierze.idZwierze
                                                                                   FROM mydb.Zwierze
                                                                                   WHERE mydb.Zwierze.Uzytkownik_idUzytkownik = ${req.params.id}));`;

    db.instance.query(query, (err, rows, fields) => {

        const schema = {
            object : []
        }

        rows.forEach(row => {
            
            schema.object.push({
                id : row.idOgloszenie,
                title : row.tytul,
                contents : row.tresc,
                addedTimeStamp : row.dataPrzyjecia,
                expirationTimeStamp : row.dataWygasniecia,

                localisation : {
                    id : row.idLokalizacja,
                    city : row.miasto,
                    postCode : row.kodPocztowy
                }
            })
        });

        res.send(schema);

    })
}

module.exports.get_offers_of_advertisement = (req, res) => {
    let query = `SELECT *
    FROM mydb.Oferta
    WHERE mydb.Oferta.idOferta IN (SELECT mydb.Plan.Oferta_idOferta
                                   FROM mydb.Plan
                                   WHERE mydb.Plan.Termin_idTermin IN (SELECT mydb.Termin.idTermin
                                                                       FROM mydb.Termin
                                                                       WHERE mydb.Termin.Ogloszenie_idOgloszenie = ${req.params.id}));
    `;

    db.instance.query(query, (err, rows, fields) => {

        const schema = {
            object : []
        }

        rows.forEach(row => {
            schema.object.push(JSON.parse(JSON.stringify({
                id : row.idOferta,
                status : (row.status != null ? (row.status[0] == 1 ?(true):(false)) : null),
                userID : row.Uzytkownik_idUzytkownik
                })))

                
        });

        res.send(schema);

    })
}

module.exports.get_offers_to_user = (req, res) => {
    let query = `SELECT *
    FROM mydb.Oferta
    WHERE mydb.Oferta.idOferta IN (SELECT mydb.Plan.Oferta_idOferta
                                   FROM mydb.Plan
                                   WHERE mydb.Plan.Termin_idTermin IN (SELECT mydb.Termin.idTermin
                                                                       FROM mydb.Termin
                                                                       WHERE mydb.Termin.Ogloszenie_idOgloszenie IN (SELECT Ogloszenie.idOgloszenie
                                                                                                                    FROM Ogloszenie
                                                                                                                    WHERE mydb.Ogloszenie.idOgloszenie IN (SELECT mydb.Opieka.Ogloszenie_idOgloszenie
                                                                                                                                                           FROM mydb.Opieka
                                                                                                                                                           WHERE mydb.Opieka.Zwierze_idZwierze IN (SELECT mydb.Zwierze.idZwierze
                                                                                                                                                                                                   FROM mydb.Zwierze
                                                                                                                                                                                                   WHERE mydb.Zwierze.Uzytkownik_idUzytkownik = ${req.params.id})))))`;
    
    db.instance.query(query, (err, rows, fields) => {

        const schema = {
            object : []
        }

        rows.forEach(row => {
            schema.object.push(JSON.parse(JSON.stringify({
                id : row.idOferta,
                status : (row.status != null ? (row.status[0] == 1 ?(true):(false)) : null),
                userID : row.Uzytkownik_idUzytkownik
                })))

                
        });

        res.send(schema);

    })                                                                                                                                                                                          
}