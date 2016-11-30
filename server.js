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



function request( seats_left , requests , index , name) {
    console.log("request called");
    no_of_req = requests[index];
    var market_price = 250;
    var total_seats = 76;
    var max_discount = 0.8 * market_price;
    var best_price = market_price;
    console.log("request called");
    console.log(index);

    if ((0 <= no_of_req < 2) && (15 <= seats_left < 22)) {
        dis_per = 40;
        console.log("1");
        console.log("seats left" + seats_left);
        console.log("req" + no_of_req);
    }
    else if ((0 <= no_of_req < 2)
        && (22 < seats_left < 30)) {
        dis_per = 60;
        console.log("2");
        console.log("seats left" + seats_left);
    }
    else if ((0 <= no_of_req < 2)
        && (seats_left >= 22)) {
        dis_per = 60
        console.log("3");
        console.log("seats left" + seats_left);
    }
    else if ((3 <= no_of_req < 5)
        && (15 <= seats_left < 22)) {

        dis_per = 25
        console.log("4");
        console.log("seats left" + seats_left);
    }
    if ((3 <= no_of_req < 5)
        && (22 <= seats_left < Math.floor(0.499 * total_seats))) {
        dis_per = 40
        console.log("5");
        console.log("seats left" + seats_left);
    }
    else if ((3 <= no_of_req < 5)
        && (seats_left >= Math.floor(0.5 * total_seats))) {

        dis_per = 40
        console.log("6");
        console.log("seats left" + seats_left);
    }


    else if ((no_of_req >= 5)
        && (15 < seats_left < Math.floor(0.299 * total_seats))) {

        dis_per = 25
        console.log("7");
        console.log("seats left" + seats_left);

    }

    else if (no_of_req >= Math.floor(0.7 * seats_left)
        && (0.3 * total_seats <= seats_left < Math.floor(0.499 * total_seats))) {

        dis_per = 25
        console.log("8");
        console.log("seats left" + seats_left);

    }


    else if (no_of_req >= Math.floor(0.7 * seats_left)
        && (seats_left >= Math.floor(0.5 * total_seats))) {

        dis_per = 40
        console.log("9");
        console.log("seats left" + seats_left);
    }
    console.log(dis_per);
    best_price = ((100 - dis_per) / 100) * market_price;
    console.log("best price" + best_price);
    var message = {
        to: 'd3L8GrhMzpw:APA91bGKIyytJNEk5OO3SLgdwILCaXHSVDPvyXkP8U1ZMfEVRQ5FuQwOw_LzjjfgrU0j-Ov7-ic2HnHp-6hmqk5OQPksg3CrseMMZo-ujK09JbIrspuk8MwDDGgXWV9POKRGB31xdMji', // required fill with device token or topics
        collapse_key: 'your_collapse_key',
        data: {
            title: "Movies Today",
            movie_name: name,
            price: best_price,
        }
        // console.log(requests[i]);/
    };
    fcm.send(message, function (err, response) {
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
}

var requests = new Array(16).fill(0);
app.use('/enquiry' , (req , res)=>{
    var hall = req.body.hall;
    var movie = req.body.movie;
    var left = req.body.left;
    var index ;
    var name;

    console.log(hall);
    console.log(movie);
    console.log(left);


    ///////////////////////////////
    if(hall == 0){
        if(movie == 0){
            //movie = Dear Zindagi

            requests[0]++;
            console.log(requests[0]);
            index = 0;
            name = "Dear Zindagi";

        }
        if(movie == 1){
            //movie = Force 2

            requests[1]++;
            index = 1;
            name = "Force 2";

        }
        if(movie == 2){
            //movie = Ae dil hai Mushkil


            requests[2]++;
            index = 2;
            name = "Ae Dil hai Mushkil";

        }
        if(movie == 3){
            //Rock on 2

            requests[3]++;
            index = 3;

            name = "Rock On 2";

        }
    }if(hall == 1){
        if(movie == 0){
            //movie = Dear Zindagi

            requests[4]++;
            index = 4;
            name = "Dear Zindagi";
        }
        if(movie == 1){
            //movie = Force 2

            requests[5]++;
            index = 5;
            name = "Force 2";
        }
        if(movie == 2){
            //movie = Ae dil hai Mushkil

            requests[6]++;
            index = 6;
            name = "Ae Dil Hai Mushkil";
        }
        if(movie == 3){
            //Rock on 2

            requests[7]++;
            index = 7;
            name = "Rock On 2";
        }
    }if(hall == 2){
        if(movie == 0){
            //movie = Dear Zindagi

            requests[8]++;
            index = 8;
            name = "Dear Zindagi";
        }
        if(movie == 1){
            //movie = Force 2

            requests[9]++;
            index = 9;
            name = "Force 2";
        }
        if(movie == 2){
            //movie = Ae dil hai Mushkil

            requests[10]++;
            index = 10;
            name = "Ae Dil Hai Mushkil";
        }
        if(movie == 3){
            //Rock on 2

            requests[11]++;
            index = 11;
            name = "Rock On 2";
        }
    }if(hall == 3){
        if(movie == 0){
            //movie = Dear Zindagi

            requests[12]++;
            index = 12;
            name = "Dear Zindagi";
        }
        if(movie == 1){
            //movie = Force 2

            requests[13]++;
            index = 13;
            name = "Force 2";
        }
        if(movie == 2){
            //movie = Ae dil hai Mushkil

            requests[14]++;
            index = 14;
            name = "Ae Dil Hai Mushkil";
        }
        if(movie == 3){
            //Rock on 2
            requests[15]++;
            index = 15;
            name = "Rock On 2";
        }

    }

    setTimeout(request , 1000  , left , requests , index , name);
    ////////////////////////////////

});
var movie_hall;
var movie_name;
app.use('/getbooking',(req, res)=>{
    res.send(booked);
});

var booked = [];
function calCase(hall , movie ) {
    booked = [];
    max = 10;
    min = 1;


    if(hall == 0){
        if(movie == 0){
            for( i = 0 ; i < 60 ; i++) {
                var x = Math.floor(Math.random() * (max - min) + min);
                var y = Math.floor(Math.random() * (max - min) + min);

                booked.push(   (x + "_" + y) );
            }
            booked.push(hall);
            booked.push(movie);
            console.log(booked);

        }
        if(movie == 1){

            for( i = 0 ; i < 120 ; i++) {
                var x = Math.floor(Math.random() * (max - min) + min);
                var y = Math.floor(Math.random() * (max - min) + min);

                booked.push(   (x + "_" + y) );
            }

            booked.push(hall);
            booked.push(movie);

        }
        if(movie == 2){

            for( i = 0 ; i < 20 ; i++) {
                var x = Math.floor(Math.random() * (max - min) + min);
                var y = Math.floor(Math.random() * (max - min) + min);

                booked.push(   (x + "_" + y) );
            }

        }
        if(movie == 3){

            for( i = 0 ; i < 5 ; i++) {
                var x = Math.floor(Math.random() * (max - min) + min);
                var y = Math.floor(Math.random() * (max - min) + min);

                booked.push(   (x + "_" + y) );
            }

            booked.push(hall);
            booked.push(movie);

        }
    }
    if(hall == 1){
        if(movie == 0){

        }
        if(movie == 1){

        }
        if(movie == 2){

        }
        if(movie == 3){

        }
    }
    if(hall == 2){
        if(movie == 0){

        }
        if(movie == 1){

        }
        if(movie == 2){

        }
        if(movie == 3){

        }
    }

}
app.use('/webview' , (req , res)=>{
    var hall = req.body.hall;
    var movie = req.body.movie;
    console.log(hall + movie);
    calCase(hall, movie);
    console.log(booked);
    console.log("webview called");
    console.log(booked);
   res.render('seating');
    console.log("helloe");
});

app.get('/notice' , (req , res)=>{
    var message = {
        to: 'd3L8GrhMzpw:APA91bGKIyytJNEk5OO3SLgdwILCaXHSVDPvyXkP8U1ZMfEVRQ5FuQwOw_LzjjfgrU0j-Ov7-ic2HnHp-6hmqk5OQPksg3CrseMMZo-ujK09JbIrspuk8MwDDGgXWV9POKRGB31xdMji', // required fill with device token or topics
        collapse_key: 'your_collapse_key',
         data: {
             your_custom_data_key: 'random'
         },
        notification: {
            title: '',
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



app.listen(port, '192.168.1.101',(req , res)=>{

    console.log("server started at port 8000");
    // calculate();

});

