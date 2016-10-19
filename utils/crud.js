/**
 * Created by rishabhkhanna on 13/9/16.
 */
const mongoClient = require('mongodb').MongoClient;
//use connect method to connect to the server
var connection = ()=>{
    const url = 'mongodb://localhost:27017/movie_hall_data'; //is the name of my database
    mongoClient.connect(url , (err , db)=>{
        if(err) throw err;
        console.log("connected to database");
        return db;
    });
//use connect method to connect to the server
};

module.exports = {

    addData : (cb)=>{
        var db = connection();

        var insertDocuments = (db)=>{
            //get the documents collection == tables
            var collection = db.collection('cinemasinfo');
            collection.insertMany([
            ] , (err, result)=>{
                if(err) throw err;
                console.log("inserted data into mongodb");
                // callback();
                cb();
            })
        }
    }
};
const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/movie_hall_data'; //is the nmae of my database

mongoClient.connect(url , (err , db)=>{
    if(err) throw err;

    console.log("connected to database");
    var insertData  = (db)=>{
        //get the documents collection == tables
        var collection = db.collection('cinemasinfo');
        collection.insertMany([
            {name: "JAM Shipra" , address : "Shipra Mall, Shipra Mall Underpass, Block A, Vaibhav Khand, Indirapuram, Vaibhav Khand, Indirapuram, Noida, Uttar Pradesh 201014",
                lat: 28.634148 , long: 77.369521},
            {name: "SRS Aditya Mall" , address : "ground floor, Aditya city centre, Aditya Mega City, Vaibhav Khand, Indirapuram, Ghaziabad, Uttar Pradesh 201014",
                lat: 28.638671 , long: 77.360646},
            {name: "M2K Rohini" , address : "16 Mangalam Place District Centre, Sector-3, Rohini, Delhi, 110085",
                lat: 28.700918 , long: 77.116626},
            {name: "Cinepolis Rohini" , address : "Garg Trade Centre, 6, 2nd Floor, Garg Trade Centre, Sector 11, Near HDFC Bank, Rohini, Pocket 4, Sector 11E, Rohini, New Delhi, Delhi 110085",
                lat: 28.734392 , long: 77.113586}
        ] , (err, result)=>{
            if(err) throw err;
            console.log("inserted data into mongodb");
        });
        collection.find({}).toArray(function(err, docs) {
            console.log("Found the following records");
            console.dir(docs);
            callback(docs);
        });
    };
});
