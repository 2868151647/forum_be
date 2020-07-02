const Users = require('../models/users');
const {
  body,
  validationResult
} = require('express-validator');
const JwtUtil = require('../public/utils/jwt');
const Encryption = require('../public/utils/encryption')
const nodemailer = require('nodemailer');
var ObjectID = require('mongodb').ObjectID;

// 更新
exports.users_charupdata = (req, res) => {
  console.log(req.body);
  res.json({
    msg: 200
  })
  // Users.findByIdAndUpdate(req.body.userid, {chatroomactive:req.body.newsid}, {new:true}, function (err, theuser) {
  //   if (err) {
  //     return next(err);
  //   }
  //   // Successful - redirect to genre detail page.
  //   console.log(theuser)
  // });
}
// 清除人数
exports.users_recharupdata = (req, res) => {
  var userid = req.body.userid
  Users.findByIdAndUpdate(ObjectID(userid), {
    $set: {
      chatroomactive: ''
    }
  }, {
    new: true
  }, (err, callback) => {
    if (err) {
      console.log('err happened');
    }
    console.log('清除')
  })
}
//chatromm 确定人数
exports.users_chat = (req, res) => {
  let chatid = req.body.chatid
  Users.find({
    chatroomactive: chatid
  }, (err, chat) => {
    if (err) {
      console.log('something error')
    }
    res.json({
      data: chat
    })
    console.log('人数', res.data)
  })
}

// 显示完整的用户列表
// res.render('users',{data: '用户界面'});
exports.users_list = (req, res) => {
  Users.find((err, users_list) => {
    if (err) {
      console.log('something error')
    }
    res.render('users', {
      users_list
    })
  })
};

//管理员登录
exports.admin_login = (req, res) => {
  res.render('home')
}
exports.users_one_fe = (req, res) => {
  // console.log("我的数据",req.params)
  var account = req.params.id;
  Users.findOne({
    'account': account
  }, (err, data) => {
    if (err) {
      console.log('something error')
    } else {
      res.json({
        data: data,
        status: 200
      })
    }


  })
};

exports.users_registerid = (req, res) => {
  console.log('获取account', req.body.account)
  var account = req.body.account
  Users.find({
    'account': account
  }, (err, data) => {
    console.log(err)
    console.log(data)
    if (err) {
      console.log('something error')
    } else {
      if (data.length == 0) {
        res.json({
          data: 'fail'
        })
        //账号不存在
      } else {
        res.json({
          data: 'scuess'
        })
        //账号存在
      }
    }
  })
}

exports.users_login = (req, res) => {
  // Users.find({'account': req.params.account,'password': req.params.password},(err,msg) => {})
  var account = req.body.account;
  var pass = req.body.password;
  new Promise((resolve, reject) => {
    // 根据用户名查询用户
    Users.findOne({
      'account': account
    }).exec((err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }).then((result) => {
    // console.log(result)
    if (result) {
      // 密码解密 利用aes
      if (Encryption.Decrypt(pass) == result.password) {
        // 登陆成功，添加token验证
        let _id = result._id.toString();
        // 将用户id传入并生成token
        let jwt = new JwtUtil(_id);
        let token = jwt.generateToken();
        // 将 token 返回给客户端
        res.json({
          status: 200,
          msg: '登陆成功',
          token: token,
          u_id: account
        });

      } else {
        res.json({
          status: 400,
          msg: '账号密码错误'
        });
      }
    } else {
      res.json({
        status: 404,
        msg: '账号不存在'
      })
    }
  }).catch((err) => {

    res.json({
      status: 500,
      msg: '账号密码错误'
    });
  })
}

exports.users_token_post = (req, res) => {
  res.json({
    status: 200
  })
}

exports.users_token_get = (req, res) => {
  res.json({
    status: 200
  })
}
// // 为每位用户显示详细信息的页面
// exports.users_detail = (req, res) => { res.send('未实现：用户详细信息1：' + req.params.id); };

// 由 POST 处理用户创建操作
exports.users_create_post = [

  //使用express-validator验证
  body('first_name').isLength({
    min: 1
  }).trim().withMessage('First name must be specified')
  .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
  body('family_name').isLength({
    min: 1
  }).trim().withMessage('Family name must be specified.')
  .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
  body('age').isInt({
    min: 1
  }).trim().withMessage('Pleasr input age and suru it is interger'),

  // 使用 escape 接收到的数据进行 验证
  body('first_name').escape(),
  body('family_name').escape(),
  body('age').escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create User object with escaped and trimmed data
    var user = new Users({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      age: req.body.age,
      account: {
        type: String
      },
      password: {
        type: String
      }
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render('users_form', {
        title: 'Create User',
        user: user,
        errors: errors.array()
      });
      return;
    } else {
      // Data from form is valid.

      // Save author.
      user.save(function (err) {
        if (err) {
          return next(err);
        }
        // Successful - redirect to new author record.
        res.redirect('/forum/users');
      });
    }
  }
];

exports.users_registercreate = [

  (req, res, next) => {
    console.log('comment_data:', req.body)
    let account = req.body.account
    let password = req.body.password
    let email = req.body.email
    var user = new Users({
      account: account,
      password: password,
      email: email
    })

    user.save(function (err) {
      if (err) {
        return next(err)
      }
      res.json({
        msg: 200,
      })
    })

  }
]

// 由 GET 显示创建用户的表单
// exports.users_create_get = (req, res) => { res.render('users_form',{title:'用户表单创建'}); };
exports.users_create_get = function (req, res, next) {
  res.render('users_form', {
    title: 'Create User'
  });
};

// 由 GET 显示删除用户的表单
exports.users_delete_get = (req, res) => {
  Users.findByIdAndRemove(req.params.id, function (err, results) {
    if (err) {
      return next(err);
    }
    res.redirect('/forum/users')
  })
};

// 由 POST 处理用户删除操作
exports.users_delete_post = (req, res) => {
  Users.findByIdAndRemove(req.params.id, function (err, results) {
    if (err) {
      return next(err);
    }
    res.redirect('/forum/users')
  })
};

// 由 GET 显示更新用户的表单
exports.users_update_get = (req, res) => {
  Users.findById(req.params.id, function (err, user) {
    if (err) {
      return next(err);
    }
    if (user == null) { // No results.
      var err = new Error('User not found');
      err.status = 404;
      return next(err);
    }
    // Success.
    res.render('users_form', {
      title: 'Update User',
      user
    });

  });
};

// 由 POST 处理用户更新操作
exports.users_update_post = [
  //使用express-validator验证
  body('first_name').isLength({
    min: 1
  }).trim().withMessage('First name must be specified')
  .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
  body('family_name').isLength({
    min: 1
  }).trim().withMessage('Family name must be specified.')
  .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
  body('age').isInt({
    min: 1
  }).trim().withMessage('Pleasr input age and suru it is interger'),

  // 使用 escape 接收到的数据进行 验证
  body('first_name').escape(),
  body('family_name').escape(),
  body('age').escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    var user = new Users({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      age: req.body.age,
      account: {
        type: String
      },
      password: {
        type: String
      },
      _id: req.params.id
    });
    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values and error messages.
      res.render('users_form', {
        title: 'Update User',
        user,
        errors: errors.array()
      });
      return;
    } else {
      // Data from form is valid. Update the record.
      Users.findByIdAndUpdate(req.params.id, user, {}, function (err, theuser) {
        if (err) {
          return next(err);
        }
        // Successful - redirect to genre detail page.
        res.redirect('/forum/users');
      });
    }
  }
];

exports.users_updatebyid = (req, res) => {

  var user = new Users({
    first_name: req.body.firstname,
    family_name: req.body.familyname,
    age: req.body.age,
    account: {
      type: String
    },
    password: {
      type: String
    },
    _id: req.body.id
  })
  Users.findByIdAndUpdate(req.body.id, user, {}, function (err, doc) {
    if (err) {
      console.log('数据库发生错误')
    }
    res.json({
      msg: 200
    })
  })
}


exports.users_getinvitecode = (req, res) => {
  var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  function generateMixed() {
    var res = "";
    for (var i = 0; i < 6; i++) {
      var id = Math.ceil(Math.random() * 35);
      res += chars[id];
    }
    return res;
  }
  var inviteCode = generateMixed()
  var user = new Users({
    first_name: req.body.firstname,
    family_name: req.body.familyname,
    age: req.body.age,
    account: {
      type: String
    },
    password: {
      type: String
    },
    invitecode:inviteCode,
    _id: req.body.id
  })
  Users.findByIdAndUpdate(req.body.id, user, {}, function (err, doc) {
    if (err) {
      console.log('数据库发生错误')
    }
    res.json({
      msg: 200,
    })
  })
}

//邮箱验证处理
exports.users_email = (req, res) => {
  var email = req.body.email
  var transporter = nodemailer.createTransport({
    //https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
    service: 'qq',
    port: 465, // SMTP 端口
    secureConnection: true, // 使用 SSL
    auth: {
      user: '2868151647@qq.com', //发送邮箱名
      //这里密码不是qq密码，是你设置的smtp密码
      pass: 'smykalfckfurdfaa'
    }
  });
  var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  function generateMixed() {
    var res = "";
    for (var i = 0; i < 6; i++) {
      var id = Math.ceil(Math.random() * 35);
      res += chars[id];
    }
    return res;
  }
  var emailCode = generateMixed()
  console.log('Code:', emailCode)
  var mailOptions = {
    from: '2868151647@qq.com', // 发件地址
    to: email, // 收件列表
    subject: 'Hello', // 标题
    //text和html两者只支持一种
    html: '<h1>Hello!</h1><p style="font-size: 18px;color:#000;">您注册的论坛验证码为：<u style="font-size: 16px;color:#1890ff;">' + emailCode + '</u></p><p style="font-size: 14px;color:#666;">10分钟内有效</p>'
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
  res.json({
    code: emailCode
  })
}