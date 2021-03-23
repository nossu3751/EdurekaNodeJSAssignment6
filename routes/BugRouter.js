const express = require('express');
const router = express.Router();
const cors = require('cors');
var bug = require('../models/bug.model');

var corsOption={
    origin:'*',
    optionsSuccessStatus:200
}

router.use((req,res,next)=>{
    console.log("Time", Date.now());
    next();
})

router.get('/', cors(corsOption), (req,res)=>{
    bug.find((err,data)=>{
        if(err){
            throw err;
        }else{
            res.json(data);
        }
    })
})

router.post('/', cors(corsOption), (req,res)=>{
    bug.create(req.body, (err, data)=>{
        if(err){
            throw err;
        }else{
            // res.send("posted!")
            bug.findOne(req.body).then((resolve)=>{
                res.json(resolve);
            })
        }
    })
})

router.put('/', cors(corsOption), (req,res)=>{
    let query = req.body;
    bug.updateOne(
        {
            "_id":query._id
        },{
            "$set":query
        },
        (err, data)=>{
            if(err){
                throw err;
            }else{
                // res.send("updated!")
                bug.findOne({"_id":query._id}).then((resolve)=>{
                    res.json(resolve);
                })
            }
        }
    )
})

router.delete('/', cors(corsOption), (req,res)=>{
    let query = req.body;
    bug.deleteOne(
        {
            "_id":query._id
        },
        (err)=>{
            if(err){
                throw err;
            }else{
                res.send(true);
            }
        }
    )
})

module.exports = router;