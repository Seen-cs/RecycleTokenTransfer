
const express = require('express');
const carbonFootprintOfCities = require("./carbonFootprintOfCities.js");
const carbonFootprintOfProducts = require("./carbonFootprintOfProducts.js");

var cors = require("cors")
const server = express();

server.use(cors());



server.get('/',(req,res)=>{
    res.send('expressten merhaba');
    
})
server.get("/urunler",cors(),(req,res)=>{
    res.status(200).json(carbonFootprintOfProducts);
})
server.get("/sehirler",cors(),(req,res)=>{
    res.status(200).json(carbonFootprintOfCities);
})
server.listen(8080,()=>{
    console.log('calısıtı');
});

