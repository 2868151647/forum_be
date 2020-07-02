var mongoose = require('mongoose')
var user = require('./models/users')

const mongoDB = 'mongodb://localhost/forumdb';
mongoose.connect(mongoDB,{useNewUrlParser: true, useUnifiedTopology: true});

var user1 = new user({
  first_name:"zhang",
  family_name:"san",
  age:20
})

user1.save(function(err,res){
  if(err){
    console.log('error')
  }else{
    console.log('success');
    console.log(res)
  }
})