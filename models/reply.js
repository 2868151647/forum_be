const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ReplySchema = new Schema({

  content:{type: String, required:true},
  date:{type: Date, required:false, default:Date.now},
  authorname:{type: String, require:true},
  replytoid:{type: String, required:true}
  
})

  module.exports = mongoose.model('Reply',ReplySchema)