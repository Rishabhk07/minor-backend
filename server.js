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

var price = 240;

app.use(express.static(path.join(__dirname , 'public')));
app.set('port' , process.env.PORT || 3000);
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.set('view engine' , 'hbs');
app.set('views' , __dirname + "/views");
app.get('/', express.static(__dirname + "/public"));

var port = process.env.PORT || 3000;

app.use('/cinema',(req , res)=>{

    cinema.getcinema((rows)=>{
        res.send(rows);
    })

});


const booking = require('./models/BookingCheck');

var movies = {
    dz: [],
    ae : [],
    force : []
};



app.get('/increase',(req,res)=>{
    console.log(movies.dz.push("YO"));
});

app.get('/ae',(req , res)=>{
    movies.ae.push("A");
});

app.post('/algo' , (req , res)=>{

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
        }
    }



});



app.get('/webview' , (req , res)=>{
    console.log("webview called");
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

var dz_last = 0;
var ae_last  = 0;
var force_last = 0;

function newPrice(diff, number) {
    var movie = "";
    // if(number == 1){
    //     movie = getDZ();
    // }else if(number == 2){
    //     movie = getAe();
    // }else if(number == 3){
    //     movie = getForce();
    // }

    if(diff > 0){
        price = price + 1;
    }else if(diff < 0){
        price  = price -1;
    }

    var message = {
        to: 'd3L8GrhMzpw:APA91bGKIyytJNEk5OO3SLgdwILCaXHSVDPvyXkP8U1ZMfEVRQ5FuQwOw_LzjjfgrU0j-Ov7-ic2HnHp-6hmqk5OQPksg3CrseMMZo-ujK09JbIrspuk8MwDDGgXWV9POKRGB31xdMji', // required fill with device token or topics
        collapse_key: 'your_collapse_key',
        data: {
            your_custom_data_key: 'random',
            Rishabh: "Khanna",
            price : "Rs" + price,
        }
    };

    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });



}
function calculate(){
    console.log("Algo Calculate Called");
    var value = true;
    var dz_len = movies.dz.length;
    var ae_len = movies.ae.length;
    var force_len = movies.force.length;

    console.log(dz_len + " " + ae_len + " " + force_len);

    if(dz_len != 0 && (dz_len - dz_last) != 0) {
        var diff = dz_len - dz_last;
        console.log("diff dz: " + (dz_len - dz_last));
        // value = false;
        newPrice(diff , 1);
    }
    if(ae_len != 0) {
        console.log("diff ae: " + (ae_len - ae_last));
        value = false;
        newPrice(diff , 2);
    }
    if(force_len != 0) {
        console.log("diff force: " + (force_len - force_last));
        value = false;
        newPrice(diff , 3);
    }

    console.log(price);
    dz_last = dz_len;
    ae_last = ae_len;
    force_last = force_len;
    if(value == true) {
        setTimeout(calculate, 1000);
    }
}



app.listen(port,(req , res)=>{

    console.log("server started at port 8000");
    // calculate();
});

