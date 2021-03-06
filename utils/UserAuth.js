/**
 * Created by rishabhkhanna on 19/10/16.
 */
const mongoClient = require('mongodb');
var url = "mongodb://localhost:27017/UserAuth";

var getconnection = (cb)=>{
    mongoClient.connect(url , (err , db)=>{
        if(err) throw err;
        console.log("Connnected Successfully with user Database");
        cb(db);
    });

};

module.exports = {
    addUser:(userData , cb)=>{
         getconnection((db)=>{
            const collection = db.collection('UserAuthData');
            collection.insertOne(userData ,(err , result)=>{
                if (err) throw err;
                console.log("user data added succesfully with data:- " + result);
                cb(result);
                db.close()});
            });
    },
    getUser:(email , cb)=>{
        getconnection((db)=>{
            const collection = db.collection('UserAuthData');
            collection.find({"email":email}).toArray((err, docs)=>{
                if(err) throw err;
                console.log(docs[0]);
                cb(docs[0]);
            })
        })
    }
};
