const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UsersSchema = new Schema({
  first_name: {type: String, required: false, max: 5,default:'未命名'},
  family_name: {type: String, required: false, max: 5,default:'x'},
  age:{type: Number,default:0},
  account:{type: String},
  password:{type: String},
  email:{type:String},
  chatroomactive:{type:String, require:false},
  invitecode:{type:String,require:false}
})

UsersSchema
  .virtual('name')
  .get(function () {
    return this.family_name + ', ' + this.first_name;
  });  


// 虚拟属性'url'：作者 URL
UsersSchema
  .virtual('url')
  .get(function () {
    return '/forum/users/' + this._id;
  });

// 导出 Author 模型
module.exports = mongoose.model('Users', UsersSchema);