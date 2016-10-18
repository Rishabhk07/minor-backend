/**
 * Created by rishabhkhanna on 13/9/16.
 */
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mysql = require('mysql');

const cinema = require('./cinemainfo');


app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.set('views' , __dirname + "/views");
app.use('/', express.static(__dirname + "/public"));

app.use('/cinema',(req , res)=>{

    cinema.getcinema((rows)=>{
        res.send(rows);
    })

});

app.post('/addUser' , (req , res)=>{
   console.log(req.body);
    res.send(req.body);
});


app.listen(8000,(req , res)=>{
    console.log("server started at port 8000");
});