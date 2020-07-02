const mongoose = require('mongoose')

const Schema = mongoose.Schema

const FocusSchema = new Schema({
  // tittle:{type: String, required:true},
  // content:{type:String, required:true},
  // date:{type:Date, required:false, default:Date.now},
  // authorid:{type: String, required:true},
  // author:{type: String, required:true},
  focusnewsid:{type:String, required: true},
  userid:{type:String, required: true}
})


  module.exports = mongoose.model('Focus',FocusSchema)