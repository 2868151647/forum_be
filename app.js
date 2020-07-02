
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const JwtUtil = require('./public/utils/jwt');
var cors = require("cors"); 

var indexRouter = require('./routes/index');
var forumRouter = require('./routes/forum');


var app = express();

// Set up mongoose connection
var mongoose = require('mongoose');
// mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/forumdb', { useNewUrlParser: true,useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// app.all("*",function(req,res,next){
//   //设置允许跨域的域名，*代表允许任意域名跨域
//   res.header("Access-Control-Allow-Origin","*");
//   //允许的header类型
//   res.header("Access-Control-Allow-Headers","content-type");
//   //跨域允许的请求方式 
//   res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
//   if (req.method.toLowerCase() == 'options')
//       res.send(200);  //让options尝试请求快速结束
//   else
//       next();
// })

app.use(cors({
  　　methods: ["GET", "POST"],
  　　alloweHeaders: ["Content-Type", "application/json;charset=utf-8;application/x-www-form-urlencoded"]
  }));

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// app.use(function (req, res, next) {
//   // 我这里知识把登陆和注册请求去掉了，其他的多有请求都需要进行token校验 
//   console.log('输出url:',req.url)
//   if (req.url == '/forum/login' || req.url == '/forum/register' || req.url == '/forum/email' || req.url == '/forum/regisyercreate')  {
//     // req.url != '/forum/login' || req.url != '/forum/register' || req.url !== '/forum/email'
//      next()
      
//   } else {
//     // console.log('这里非登录前url',req.url)
//     let token = req.headers.authorization;
//     let headerx = req.headers
//     // console.log('输出token:',token)
//     // console.log('输出header:',headerx)
//     // console.log(typeof token)
//     // 如果考验通过就next，否则就返回登陆信息不正确
//     if(typeof token === 'undefined'){
//       res.json({status: 401, msg: '请获取token'});
//     }else{
//       let jwt = new JwtUtil(token);
//       let result = jwt.verifyToken();
//       if (result == 'err') {
//         // console.log(result);
//         res.json({status: 403, msg: '登录已过期,请重新登录'});
//         // res.render('login.html');
//     } else {
//       // console.log('存在token且token没有过期')
//         next();
//     }
//     }
//   }
// });
// view engine setup
// 模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//开放静态资源
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/node_modules',express.static(path.join(__dirname, './node_modules')));
app.use('/node_modules',express.static('./node_modules'));



app.use('/', indexRouter);
app.use('/forum',forumRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
