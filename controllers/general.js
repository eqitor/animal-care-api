//instance of database connection
var db = require('./db_connection');
var temp_array = [];
var qr1 = (query) => {
    //let array = [];
    db.instance.query(query, (err,rows,fields) => {
        
         for(let row of rows){
            // console.log(row);
             temp_array.push({id : row.idZwierze, name : row.imie, Spieces : row.gatunek, age : row.wiek, sex : row.plec});
             //console.log('1');
         };
        // console.log(`PRZED RETURNEM: ${array}`);
         
    })
    console.log(`TU JUŻ NIE WIDZI: ${array}`)
    return array;
}



module.exports.get_all_advertisements = (req,res) => {

    let query = `SELECT * FROM Ogloszenie JOIN Lokalizacja ON Lokalizacja_idLokalizacja = idLokalizacja`;
    
    db.instance.query(query, (err, rows, fields) => {

        const Schema = {
            object : []
        }

        for(let row of rows) {
            
            Schema.object.push( {
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
                    animals : undefined
                }
                
            })

            db.instance.query(`SELECT Opieka.idOpieka, Zwierze.idZwierze, Zwierze.imie, Zwierze.plec, Zwierze.wiek, Zwierze.gatunek FROM Opieka 
            JOIN Zwierze ON Opieka.Zwierze_idZwierze = Zwierze.idZwierze WHERE Opieka.Ogloszenie_idOgloszenie = ${row.idOgloszenie}`, (err, rows, fields) => {
                
                for(let o in Schema.object){
                    if (o.id === row.idOgloszenie) {
                        o.animals = rows;
                    }
                }
                res.send(Schema);
                

            })

        };

        



        
    })
    
   
    //console.log(general_rows);
}