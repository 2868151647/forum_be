const Comment = require('../models/comment');
const Chatroom = require('../models/chatroom')
var ObjectID = require('mongodb').ObjectID;

//聊天室 创建
exports.chat_create = (req, res, next) => {
  let name = req.body.name
  let content = req.body.content
  let newsid = req.body.newsid
  var chatroom = new Chatroom({
    name:name,
    content:content,
    newsid:newsid
  })
  chatroom.save(function(err){
    if(err){
      next()
    }
    res.json({msg:200})
  })

}

//聊天室  查询
exports.chat_select = (req, res) => {
  let id = req.body.newsid
  Chatroom.find({newsid:id},(err,chatdata) => {
    if(err){
      console.log('err occured in charrom select');
    }else{
      res.json({
        data:chatdata
      })
    }
  })
}

// 显示完整的评论信息列表
exports.comment_list = (req, res) => { 
  let id = req.body.id
  Comment.find({replyid:id},(err,comments) => {
    if(err){
      console.log('something error')
    }
      res.json({ comments:comments })
  }) 
};
exports.comment_belist = (req, res) => {
  Comment.find((err,comments) => {
    if(err){
      console.log('something error')
    }
      res.render('comment',{comments})
  }) 
};
// 为每位评论信息显示详细信息的页面
exports.comment_detail = [(req, res, next) => { 
  // let id = req.body.id
  // Comment.find({_id:ObjectID(id)},(err,data) =>{
  //   if(err){
  //     console.log('something error')
  //     return next(err)
  //   }
  //     res.json({data:data,status:200})
  // })
}
]

// 由 GET 显示创建评论信息的表单
exports.comment_create_get = (req, res) => { 
  
 };
exports.comment_create_beget = (req, res) => { 
  res.render('comment_form', {
    title: 'Create Comment'
  });
 };

// 由 POST 处理评论信息创建操作
exports.comment_create_post = [(req, res, next) => {
  let name = req.body.name
  let content = req.body.content
  let replyid =  req.body.replyid
  var comment = new Comment({
    name:name,
    content:content,
    replyid:replyid
  })

  comment.save(function (err) {
    if (err) {
      return next(err)
    }
    res.json({
      msg: 200,
    })
  })
  
}
]

exports.comment_create_bepost = [(req, res, next) => {
  console.log('comment_data:',req.body)
  let name = req.body.name
  let content = req.body.content
  let replyid =  req.body.replyid
  var comment = new Comment({
    name:name,
    content:content,
    replyid:replyid
  })

  comment.save(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect('/forum/comment/beall');
  })
  
}
]

// 由 GET 显示删除评论信息的表单
exports.comment_delete_get = (req, res) => { res.send('未实现：评论信息删除表单的 GET'); };

// 由 POST 处理评论信息删除操作
exports.comment_delete_post = (req, res) => { 
  Comment.findByIdAndRemove(req.params.id, function (err, results) {
    if (err) {
      return next(err);
    }
    res.redirect('/forum/comment/beall')
  })
 };

// 由 GET 显示更新评论信息的表单
exports.comment_update_beget = (req, res) => {
  Comment.findById(req.params.id, function (err, comment) {
    if (err) {
      return next(err);
    }
    if (comment == null) { // No results.
      var err = new Error('comment not found');
      err.status = 404;
      return next(err);
    }
    // Success.
    res.render('comment_form', {
      title: 'Update comment',
      comment:comment
    });

  });
 };

// 由 POST 处理评论信息更新操作
exports.comment_update_bepost = [
  //使用express-validator验证

  (req, res, next) => {
    var comment = ({
      name: req.body.name,
      content: req.body.content,
      replyid: req.body.replyid,
    });
    Comment.findByIdAndUpdate(req.params.id, comment, {}, function (err, theuser) {
      if (err) {
        return next(err);
      }
      // Successful - redirect to genre detail page.
      res.redirect('/forum/comment/beall');
    });
  }
];