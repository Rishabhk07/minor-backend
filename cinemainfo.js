/**
 * Created by rishabhkhanna on 13/9/16.
 */

const mysql = require('mysql');

var getconnecttion = ()=>{
    return mysql.createConnection({
        host: 'localhost',
        user: 'shoper',
        password: 'beyblade',
        database: 'shoppingcart'
    });
};

module.exports = {

    getcinema : (cb)=>{
        var connection = getconnecttion();

        query = "select * from cinema";
        connection.query(query , (err , rows , fields)=>{
            if (err) throw err;

            cb(rows);
        })

    }


};
