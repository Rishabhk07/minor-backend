/**
 * Created by rishabhkhanna on 20/10/16.
 */

const mongoclient  = require('mongodb');
var url = "mongodb://localhost:27017/MovieTicket";

var getconnection = (cb)=>{
    mongoclient.connect(url, (err,db)=>{
        if(err) throw err;
        console.log("connected successfully with Movie Ticket database");
        cb(db);
    });
};

module.exports = {
 getUserTickets: (email , cb)=>{

     const collection = db.co
 }
};