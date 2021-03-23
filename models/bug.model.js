const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bugSchema = new Schema({
    title:{type:String},
    description:{type:String},
    assignee:{type:String},
    status: {type:String, default:"Initiated"}
},
{
    timestamps:true
},
{
    collection:"bugs"
})

module.exports = mongoose.model('bug', bugSchema);