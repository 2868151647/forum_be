const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ChatroomSchema = new Schema({
  name:{type: String, required:true},
  content:{type:String, required:true, max:100},
  date:{type:Date, required:false, default:Date.now},
  newsid:{type:String, required:true}
})

  module.exports = mongoose.model('ChatroomSchema',ChatroomSchema)