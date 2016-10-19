/**
 * Created by rishabhkhanna on 13/9/16.
 */
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mysql = require('mysql');
const cinema = require('./cinemainfo');
const userAuth = require('./utils/UserAuth');
app.set('port', (process.env.PORT || 5000));
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.set('views' , __dirname + "/views");
app.get('/', express.static(__dirname + "/public"));

app.use('/cinema',(req , res)=>{

    cinema.getcinema((rows)=>{
        res.send(rows);
    })

});

app.post('/addUser' , (req , res)=>{
   userAuth.addUser(req.body , (result)=>{
       console.log(result);
       res.send(result);
    });
});


app.listen(8000,'192.168.43.164',(req , res)=>{
    console.log("server started at port 8000");
});