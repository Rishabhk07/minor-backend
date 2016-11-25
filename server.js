/**
 * Created by rishabhkhanna on 13/9/16.
 */
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mysql = require('mysql');
const cinema = require('./cinemainfo');
const userAuth = require('./utils/UserAuth');
const FCM = require('fcm-push');
const path = require('path');

var serverKey = 'AIzaSyAqMsTPz-erbb_qbPUWF8EIHp8AG1FD8Ns';
var fcm = new FCM(serverKey);

app.use(express.static(path.join(__dirname , 'public')));
app.set('port', (process.env.PORT || 5000));
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.set('view engine' , 'hbs');
app.set('views' , __dirname + "/views");
app.get('/', express.static(__dirname + "/public"));

app.use('/cinema',(req , res)=>{

    cinema.getcinema((rows)=>{
        res.send(rows);
    })

});


const booking = require('./models/BookingCheck');

var movies = [
    {dz: []},
    {ae: []},
    {force: []},
];


app.get('/algo' , (req , res)=>{

    console.log(booking);
    var seat = req.body.seat ;
    var user = req.body.user ;
    var theatre = req.body.hall;
    var movie = req.body.movie;
    var time = Date.now();

    var user = new booking(user , seat , theatre , movie , time);

    if(movie == 1){
        for( var i in movies.dz ) {
            if (typeof(user.us) == "undefined") {
                movies.dz.push(user);
            }
        }

    }else if(movie == 2){
        for( var i in movies.ae ) {
            if (typeof(user.us) == "undefined") {
                movies.ae.push(user);
            }
        }

    }else if(movie == 3){
        for( var i in movies.ae ) {
            if (typeof(user.us) == "undefined") {
                movies.ae.push(user);
            }
        };
    }






});



app.get('/webview' , (req , res)=>{
   res.render('seating');
});

app.get('/notice' , (req , res)=>{
    var message = {
        to: 'd3L8GrhMzpw:APA91bGKIyytJNEk5OO3SLgdwILCaXHSVDPvyXkP8U1ZMfEVRQ5FuQwOw_LzjjfgrU0j-Ov7-ic2HnHp-6hmqk5OQPksg3CrseMMZo-ujK09JbIrspuk8MwDDGgXWV9POKRGB31xdMji', // required fill with device token or topics
        collapse_key: 'your_collapse_key',
         data: {
             your_custom_data_key: 'random'
         },
        notification: {
            title: 'Bond James Bond',
            body: 'Minor',
            sound: 'default'
        }
    };

    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");

            res.send("could not send notification " + err);
        } else {
            console.log("Successfully sent with response: ", response);
            res.send("notification send successfully");

        }
    });
});

app.post('/addUser' , (req , res)=>{
   userAuth.addUser(req.body , (result)=>{
       console.log(result.ops[0]);
       res.send(result.ops[0]);
    });
});

app.post('/getUser' , (req ,  res)=>{
    userAuth.getUser(req.body.email , (docs)=>{
        res.send(docs);
    })
});

app.post('/getusertickets' , (req , res)=>{

});


app.listen(3000,(req , res)=>{
    console.log("server started at port 8000");
});