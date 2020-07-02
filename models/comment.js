const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CommentSchema = new Schema({
  name:{type: String, required:true},
  content:{type:String, required:true, max:100},
  date:{type:Date, required:false, default:Date.now},
  replyid:{type:String, required:true}
})

CommentSchema
  .virtual('url')
  .get(function () {
    return '/forum/comment/' + this._id;
  });

  module.exports = mongoose.model('Comment',CommentSchema)