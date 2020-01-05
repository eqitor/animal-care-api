//instance of database connection
var db = require('./db_connection');

var qr1 = function(query){
    var array = [];
    db.instance.query(query, (err,rows,fields) => {
        
         for(let row of rows){
            // console.log(row);
             array.push({id : row.idZwierze, name : row.imie, Spieces : row.gatunek, age : row.wiek, sex : row.plec});
             console.log(array);
         };
         console.log(`PRZED RETURNEM: ${array}`);
         
    })
    console.log(`TU JUŻ NIE WIDZI: ${array}`)
    return array;
}



module.exports.get_all_advertisements = (req,res) => {
    //console.log(`ccasca ${qr1(`SELECT Opieka.idOpieka, Zwierze.idZwierze, Zwierze.imie, Zwierze.plec, Zwierze.wiek, Zwierze.gatunek FROM Opieka
//JOIN Zwierze ON Opieka.Zwierze_idZwierze = Zwierze.idZwierze WHERE Opieka.Ogloszenie_idOgloszenie = 9`)}`)
    
    
    const general_rows = [];

    let query = `SELECT * FROM Ogloszenie JOIN Lokalizacja ON Lokalizacja_idLokalizacja = idLokalizacja`;
    


    db.instance.query(query, (err, rows, fields) => {

        

        for(let row of rows) {
            
            const schema = {
                id : row.idOgloszenie,
                title : null,
                contents : row.tresc,
                addedTimeSpan : row.dataPrzyjecia,
                expirationTimeSpan : row.dataWygasniecia,

                localisation : {
                    id : row.idLokalizacja,
                    city : row.miasto,
                    postCode : row.kodPocztowy
                },
                care : {
                    id : null,
                    animals : qr1(`SELECT Opieka.idOpieka, Zwierze.idZwierze, Zwierze.imie, Zwierze.plec, Zwierze.wiek, Zwierze.gatunek FROM Opieka
                    JOIN Zwierze ON Opieka.Zwierze_idZwierze = Zwierze.idZwierze WHERE Opieka.Ogloszenie_idOgloszenie = ${row.idOgloszenie}`)
                }
                
            }
           
            console.log(`ZWRÓCONA WARTOŚĆ ${qr1(`SELECT Opieka.idOpieka, Zwierze.idZwierze, Zwierze.imie, Zwierze.plec, Zwierze.wiek, Zwierze.gatunek FROM Opieka
            JOIN Zwierze ON Opieka.Zwierze_idZwierze = Zwierze.idZwierze WHERE Opieka.Ogloszenie_idOgloszenie = ${row.idOgloszenie}`)}`);

            general_rows.push(schema);
            //console.log(schema);
            
        };
    })
    
    res.send(general_rows);
    //console.log(general_rows);
}