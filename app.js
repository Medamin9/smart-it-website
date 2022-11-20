//import all dependencies 
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const express = require("express");
const bcryptjs=require('bcryptjs');
//const logger = require("morgan")
const path = require('path');
const bodyParser =require("body-parser")
const jwt =require('jsonwebtoken');
const app =express();
const mongoose =require('mongoose');
const cors = require("cors")

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

dotenv.config();
const port = process.env.PORT;

//connection to data base 
const db = mongoose.connection;
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser :true,
    
}).then(()=>{
    console.log(" connection Successful to data base");
}).catch((e)=>{
    console.log("Unable to Connected to DB");
})
//config ENV File & Require connection file 


// Require Model 


// these method is used to get data an cookies from frontend

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());  


app.get('/',(req,res)=>{
    res.send("hello word");
})
//route pour les membres 
const membreRoute = require("./routes/membreRoute");
app.use ("/membres",membreRoute)
//route pour les solutions 
const solutionRoute = require("./routes/solutionRoute");
app.use ("/solutions",solutionRoute)
//route pour la registration 

const registerRoute = require("./routes/resgitrationRoute")
app.use("/",registerRoute);

//route pour contacter société 
const contacterRoute = require("./routes/contactRoute")
app.use("/",contacterRoute);

//connection data base 

app.listen(port,()=>{
    console.log("server is list");
    console.log(port);
})