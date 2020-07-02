const Posting = require('../models/posting');
const {
  body,
  validationResult
} = require('express-validator');
const request = require("request");
var formidable = require('formidable');
var path = require('path');
// const fs = require("fs");
var sd = require('silly-datetime');
var ObjectID = require('mongodb').ObjectID;


exports.uploadimg = (req, res) => {
  console.log(req.body)
  console.log('这里是uploadimg')
}

exports.posting = [
  //     tittle: tittle,
  //     content: content,
  //     tittleimg: tittleimg,
  //     authorid: authorid,
  //     author: author
  (req, res, next) => {
    
    let tittle = '';
    let content = '';
    let authorid = '';
    let author = '';
  

    var form = new formidable.IncomingForm();
    //设置文件上传存放地址
    

    //执行里面的回调函数的时候，表单已经全部接收完毕了。
    form.parse(req,(err, fields, files) => {
      // console.log("filespath:", files.file.path) //这里能获取到图片的信息
      // console.log("tittle:", fields.name) //这里能获取到传的参数的信息，如上面的message参数，可以通过fields。message来得到
     
      tittle = fields.name
      content = fields.content
      author = fields.author
      authorid = fields.authorid
      // 建立 posting schame
      var posting = new Posting({
        tittle: tittle,
        content: content,
        authorid: authorid,
        author: author
      })
      
      posting.save(function (err) {
        if (err) {
          return next(err)
        }
        res.json({
          msg: 200,
        })
      })
    })

  }
]

// 返回发帖内容
exports.getpost = (req, res) => {
  Posting.find((err, postings) => {
    if(err){
      console,log('something eror happened on find postings')
    }else{
      res.json({
        'data':{postings} 
      })
    }
  })
}

// 根据id查找
exports.getpostbyid = (req, res) => {
  let id = req.body.id
  Posting.find({'_id':ObjectID(id)},(err, postings) => {
    if(err){
      console,log('something eror happened on find postings')
    }else{
      res.json({
        'data':postings
      })
    }
  })
}

exports.posting_all_get =(req,res) => {
  Posting.find((err,postings) => {
    if(err){
      console.log('something error')
    }
      res.render('posting',{postings})
  }) 
}
exports.posting_all_post =(req,res) => {
  
}
// .posting_becreate_get)
exports.posting_becreate_get = (req, res) => {
  res.render('posting_form', {
    title: 'Create Posting'
  });
}
// .posting_becreate_psot)
exports.posting_becreate_psot = (req, res,next) => {
  let tittle = req.body.tittle
  let content = req.body.content
  let authorid =  req.body.authorid
  let author =  req.body.author
  let date =  req.body.date
  var posting = new Posting({
    tittle:tittle,
    content:content,
    authorid:authorid,
    author:author,
    date:date
  })

  posting.save(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect('/forum/posting/all')
  })
}
// .posting_beupdate_get)
exports.posting_beupdate_get = (req, res) => {
  Posting.findById(req.params.id, function (err, posting) {
    if (err) {
      return next(err);
    }
    if (comment == null) { // No results.
      var err = new Error('comment not found');
      err.status = 404;
      return next(err);
    }
    // Success.
    res.render('posting_form', {
      title: 'Update posting',
      posting:posting
    });

  });
}
// .posting_beupdate_post)
exports.posting_beupdate_post = (req, res,next) => {
  var comment = ({
    tittle:tittle,
    content:content,
    authorid:authorid,
    author:author,
    date:date
  });
  Posting.findByIdAndUpdate(req.params.id, posting, {}, function (err, theuser) {
    if (err) {
      return next(err);
    }
    // Successful - redirect to genre detail page.
    res.redirect('/forum/posting/all');
  });
}
// .posting_bedelete_get)
exports.posting_bedelete_get = (req, res) => {
  
}
// .posting_bedelete_post)
exports.posting_bedelete_post = (req, res) => {
  Posting.findByIdAndRemove(req.params.id, function (err, results) {
    if (err) {
      return next(err);
    }
    res.redirect('/forum/posting/all')
  })
}