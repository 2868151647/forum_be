const Focus = require('../models/focus');
var ObjectID = require('mongodb').ObjectID;

exports.focus_create = (req, res, next) => {
  var focus = new Focus({
    focusnewsid:req.body.focusnewsid,
    userid:req.body.userid
  })
  focus.save(function(err){
    if(err){
      console.log('创建关注列表失败')
    }
    res.json({msg:200})
  })
}

exports.focus_list = (req, res) => {
   var id = req.body.id
  Focus.find({'userid':ObjectID(id)},(err, focus) =>{
    if(err){
      console.log('查询关注列表出错')
    }
    res.json({msg:200,data:focus})
  })
}