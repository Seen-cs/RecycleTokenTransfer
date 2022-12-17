
const express = require('express');
const carbonFootprintOfCities = require("./carbonFootprintOfCities.js");
const carbonFootprintOfProducts = require("./carbonFootprintOfProducts.js");

var cors = require("cors")
const app = express();

app.use(cors());


const bodyParser = require("body-parser");
const {ethers} = require('ethers')
var _ = require("underscore");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

const node = 'https://silent-wider-frost.ethereum-goerli.discover.quiknode.pro/97d5d849f2099d8efbc0cad26156b005562ab290/'
const provider = new ethers.providers.JsonRpcProvider(node);
var privateKey; 
var amountToSend;
var receiver;
var sender ;

const tokenAddress = '0x4685615246A0Caf18ca0CcED1533CF0659DB4FdE'  //Chainlink TokenAddress
const tokenAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]






app.post("/admintransfer",cors(),(req,res) =>{

    let body = _.pick(req.body,"amount","receiverAddress");
    console.log(req.body);
    //let { amount, receiverAddress} =req.body;
    privateKey= '871ebb73e250a640ab6d96ada6c0bab7131e02640362e20995eb16cecb4fb7d7'
    sender= '0x74813b869E53231259AA7f4AfE963823EC65c08C'
    amountToSend=body.amount;
    receiver=body.receiverAddress;
    let wallet = new ethers.Wallet(privateKey, provider)
    let contract = new ethers.Contract(tokenAddress, tokenAbi, wallet)
    async function main(){
        const decimals = await contract.decimals()
        const balance = await contract.balanceOf(sender)
        //console.log(ethers.utils.formatUnits(balance,decimals))
    
        contract.transfer(receiver, ethers.utils.parseEther(amountToSend, decimals))
        .then(function(tx){
            console.log(tx)
        })
    
    }
    main()
res.send("basarili");

})

app.post("/peartopeartransfer",cors(),(req,res) =>{

    let body = _.pick(req.body,"amount","receiverAddress","sender","privateKey");
    //let { amount, receiverAddress} =req.body;
    privateKey=body.privateKey;
    sender= body.sender;
    amountToSend=body.amount;
    receiver=body.receiverAddress;
    let wallet = new ethers.Wallet(privateKey, provider)
    let contract = new ethers.Contract(tokenAddress, tokenAbi, wallet)
    async function main(){
        const decimals = await contract.decimals()
        const balance = await contract.balanceOf(sender)
        //console.log(ethers.utils.formatUnits(balance,decimals))
    
        contract.transfer(receiver, ethers.utils.parseEther(amountToSend, decimals))
        .then(function(tx){
            console.log(tx)
        })
    
    }
    main()

res.send("basarili");
})













app.get('/',(req,res)=>{
    res.send('expressten merhaba');
    
})
app.get("/urunler",cors(),(req,res)=>{
    res.status(200).json(carbonFootprintOfProducts);
})
app.get("/sehirler",cors(),(req,res)=>{
    res.status(200).json(carbonFootprintOfCities);
})
app.listen(8080,()=>{
    console.log('calısıtı');
});

