const express = require('express');
const app=express();

app.use(express.json());

const { router } = require('./rest-api');

app.use('/',router);

app.listen(3001,()=>{
    console.log("Listening on 3001...");
});