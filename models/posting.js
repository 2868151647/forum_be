const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PostingSchema = new Schema({
  tittle:{type: String, required:true},
  content:{type:String, required:true},
  authorid:{type: String, required:true},
  author:{type: String, required:true},
  date:{type:Date, required:false, default:Date.now},
  
})


module.exports = mongoose.model('Posting',PostingSchema)