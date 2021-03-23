const express = require("express");
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const port = 8003;
// const port = process.env.PORT || 8003;
const BugRoutes = require('./routes/BugRouter')

app.use('/api/bugs', BugRoutes);

const connection = mongoose.connection;

mongoose.connect("mongodb://localhost:27017/assignment6",{
    useUnifiedTopology:true,
    useNewUrlParser:true
})

connection.once("open",()=>{
    console.log("Mongo DB Connected!");
})

app.get("/",(req,res)=>{
    res.send("Bug API!")
})

app.listen(port, ()=>{
    console.log("Successfully connected to Express Server!");
})

