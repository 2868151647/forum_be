var express = require('express');
var router = express.Router();

// Require our controllers.
var users_controller = require('../controllers/usersController'); 
var comment_controller = require('../controllers/commentController');
var posting_controller = require('../controllers/postingController');
var reply_controller = require('../controllers/replyController');
var focus_controller = require('../controllers/focusController')

/// users ROUTES ///

// GET request for creating a users. NOTE This must come before routes that display users (uses id).
router.get('/users/create', users_controller.users_create_get);

// POST request for creating users.
router.post('/users/create', users_controller.users_create_post);
router.post('/regisyercreate',users_controller.users_registercreate)
// GET request to delete users.
router.get('/users/:id/delete', users_controller.users_delete_get);

// POST request to delete users.
router.post('/users/:id/delete', users_controller.users_delete_post);

// GET request to update users.
router.get('/users/:id/update', users_controller.users_update_get);

// POST request to update users.
router.post('/users/:id/update', users_controller.users_update_post);

router.post('/users/updatebyid',users_controller.users_updatebyid)
//invitecode
router.post('/users/getinvitecode',users_controller.users_getinvitecode)

// GET request for one users.
// router.get('/users/:id', users_controller.users_detail);

// GET request for list of all users.
router.get('/users', users_controller.users_list);

router.post('/users/:id',users_controller.users_one_fe)

// 用户聊天室信息修改
router.post('/users/chatroomactive',users_controller.users_charupdata)

router.post('/users/rechatroomactive',users_controller.users_recharupdata)

// 在线人数
router.post('/users/selectchat',users_controller.users_chat)

//GET require for accoun and pwd
// router.get('/users/login/:account/:password',users_controller.users_login)
// 管理员登录
router.post('/admin/login',users_controller.admin_login)
// token login
router.post('/login',users_controller.users_login)

// 注册验证账号
router.post('/register',users_controller.users_registerid)

//邮箱验证处理
router.post('/email',users_controller.users_email)

// text token 
router.post('/token',users_controller.users_token_post)
router.get('/token',users_controller.users_token_get)

/// comment ROUTES ///

// GET request for creating comment. NOTE This must come before route for id (i.e. display comment).
router.get('/comment/create', comment_controller.comment_create_get);
router.get('/comment/becreate', comment_controller.comment_create_beget);

// POST request for creating comment.
router.post('/comment/create', comment_controller.comment_create_post);
router.post('/comment/becreate', comment_controller.comment_create_bepost);

// GET request to delete comment.
router.get('/comment/:id/delete', comment_controller.comment_delete_get);

// POST request to delete comment
router.post('/comment/:id/delete', comment_controller.comment_delete_post);

// GET request to update comment.
router.get('/comment/:id/beupdate', comment_controller.comment_update_beget);

// POST request to update comment.
router.post('/comment/:id/beupdate', comment_controller.comment_update_bepost);

// GET request for one comment.
router.post('/comment/findone', comment_controller.comment_detail);

// POST request for list of all comments.
router.post('/comment/all', comment_controller.comment_list);

router.get('/comment/beall',comment_controller.comment_belist)


// 发帖API

// 上传图片处理
router.post('/posting/uploadimg', posting_controller.uploadimg);

// 发帖 标题 内容 id 处理
router.post('/posting/saveall',posting_controller.posting)

// 返回所有帖子内容
router.post('/posting/getallpost',posting_controller.getpost)

// 根据id查找
router.post('/posting/getpostbyid',posting_controller.getpostbyid)

// 后端路由 好乱啊啊 不该写一起
router.get('/posting/becreate',posting_controller.posting_becreate_get)
router.post('/posting/becreate',posting_controller.posting_becreate_psot)
router.get('/posting/:id/beupdate',posting_controller.posting_beupdate_get)
router.post('/posting/:id/beupdate',posting_controller.posting_beupdate_post)
router.get('/posting/:id/bedelete',posting_controller.posting_bedelete_get)
router.post('/posting/:id/bedelete',posting_controller.posting_bedelete_post)
router.get('/posting/all',posting_controller.posting_all_get)
router.post('/posting/all',posting_controller.posting_all_post)


// 回复信息路由
// 创建
router.post('/reply/create',reply_controller.reply_create)
// 根据id查找
router.post('/reply/selectbyid',reply_controller.reply_selectbuid)

// 关注列表
router.post('/focuslist',focus_controller.focus_list)

//新建关注列表
router.post('/focuscreate',focus_controller.focus_create)
 
//聊天室 创建
router.post('/chatroom',comment_controller.chat_create)

//查询
router.post('/chatroom/select',comment_controller.chat_select)

module.exports = router;


