const Reply = require('../models/reply');
var ObjectID = require('mongodb').ObjectID;

exports.reply_create = [(req, res, next) => {
  console.log('comment_data:',req.body)
  let authorname = req.body.name
  let content = req.body.content
  let replytoid =  req.body.replyto
  var reply = new Reply({
    authorname:authorname,
    content:content,
    replytoid:replytoid
  })

  reply.save(function (err) {
    if (err) {
      return next(err)
    }
    res.json({
      msg: 200,
    })
  })
}
]

exports.reply_selectbuid = (req, res) => {
  let id = req.body.id
  console.log("id是什么？",id)
  Reply.find({'replytoid':id},(err, replies) => {
    if(err){
      console,log('something eror happened on find replies')
    }else{
      res.json({
        'data':replies
      })
    }
  })
}