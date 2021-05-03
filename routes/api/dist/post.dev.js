"use strict";

var express = require('express');

var router = express.Router();

var auth = require('../../middleware/auth');

var _require = require('express-validator'),
    check = _require.check,
    validationResult = _require.validationResult;

var User = require('../../models/User');

var Post = require('../../models/Post');

var Profile = require('../../models/Profile');

var Message = require('../../models/Message');

var multer = require("multer");

var multerS3 = require("multer-s3");

var aws = require("aws-sdk");

var uuid = require('uuid/v4');

var path = require('path');

var Chat = require('../../models/Chat'); //  @route  POST api/post
//  @desc   create a post
//  @access private


router.post('/', [auth, [check('text', 'Text is required').not().isEmpty()]], function _callee(req, res) {
  var errors, user, newPost, post;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(User.findById(req.user.id).select('-password'));

        case 6:
          user = _context.sent;
          console.log(req.body);
          newPost = new Post({
            text: req.body.text,
            title: req.body.title,
            name: user.name,
            user: req.user.id,
            fileName: req.body.fileName,
            filePath: req.body.filePath
          });
          _context.next = 11;
          return regeneratorRuntime.awrap(newPost.save());

        case 11:
          post = _context.sent;
          res.json({
            post: post
          });
          _context.next = 19;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](3);
          console.error(_context.t0);
          res.status(500).send('Server error');

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 15]]);
}); //  @route  POST api/post/message:receiverid
//  @desc   send a message
//  @access private

router.post('/message/:id', auth, function _callee2(req, res) {
  var user, receiver, newMessage, message;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.user.id).select('-password'));

        case 3:
          user = _context2.sent;
          console.log(user, 'THIS IS THE USER LOG');
          _context2.next = 7;
          return regeneratorRuntime.awrap(User.findById(req.params.id).select('-password'));

        case 7:
          receiver = _context2.sent;
          console.log(req.params.id);
          console.log(receiver);
          newMessage = new Message({
            text: req.body.text,
            user: user.id,
            name: user.name,
            receiver: receiver._id
          });
          _context2.next = 13;
          return regeneratorRuntime.awrap(newMessage.save());

        case 13:
          message = _context2.sent;
          res.json({
            message: message
          });
          _context2.next = 21;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).send('Server error');

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 17]]);
}); //  @route  Get api/post/messages
//  @desc   get all posts
//  @access private

router.get('/message', auth, function _callee3(req, res) {
  var user, messages;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.user.id).select('-password'));

        case 3:
          user = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(Message.find({
            receiver: user
          }).sort({
            date: -1
          }));

        case 6:
          messages = _context3.sent;
          res.json(messages);
          _context3.next = 14;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).send('Server error');

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); //  @route  Get api/post
//  @desc   get all posts
//  @access private

router.get('/', auth, function _callee4(req, res) {
  var posts;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Post.find().sort({
            date: -1
          }));

        case 3:
          posts = _context4.sent;
          res.json(posts);
          _context4.next = 11;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          res.status(500).send('Server error');

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //  @route  Get api/post/:id
//  @desc   get post by id
//  @access private

router.get('/:id', auth, function _callee5(req, res) {
  var post;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 3:
          post = _context5.sent;

          if (post) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            msg: 'Post not found.'
          }));

        case 6:
          res.json(post);
          _context5.next = 15;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);

          if (!(_context5.t0.kind == 'ObjectId')) {
            _context5.next = 14;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            msg: 'Post not found.'
          }));

        case 14:
          res.status(500).send('Server error');

        case 15:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); //  @route  DELETE api/post/:id
//  @desc   delete a post
//  @access private

router["delete"]('/:id', auth, function _callee6(req, res) {
  var post;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 3:
          post = _context6.sent;

          if (!(post.user.toString() !== req.user.id)) {
            _context6.next = 6;
            break;
          }

          return _context6.abrupt("return", res.status(401).json({
            msg: "User not authorized"
          }));

        case 6:
          _context6.next = 8;
          return regeneratorRuntime.awrap(post.remove());

        case 8:
          res.json({
            msg: 'Post removed'
          });
          _context6.next = 17;
          break;

        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0);

          if (!(_context6.t0.kind == 'ObjectId')) {
            _context6.next = 16;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            msg: 'Post not found.'
          }));

        case 16:
          res.status(500).send('Server error');

        case 17:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); // @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private

router.put('/like/:id', auth, function _callee7(req, res) {
  var post;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 3:
          post = _context7.sent;

          if (!post.likes.some(function (like) {
            return like.user.toString() === req.user.id;
          })) {
            _context7.next = 6;
            break;
          }

          return _context7.abrupt("return", res.status(400).json({
            msg: 'Post already liked'
          }));

        case 6:
          post.likes.unshift({
            user: req.user.id
          });
          _context7.next = 9;
          return regeneratorRuntime.awrap(post.save());

        case 9:
          return _context7.abrupt("return", res.json(post.likes));

        case 12:
          _context7.prev = 12;
          _context7.t0 = _context7["catch"](0);
          console.error(_context7.t0.message);
          res.status(500).send('Server Error');

        case 16:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 12]]);
}); // @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private

router.put('/unlike/:id', auth, function _callee8(req, res) {
  var post;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 3:
          post = _context8.sent;

          if (post.likes.some(function (like) {
            return like.user.toString() === req.user.id;
          })) {
            _context8.next = 6;
            break;
          }

          return _context8.abrupt("return", res.status(400).json({
            msg: 'Post has not yet been liked'
          }));

        case 6:
          // remove the like
          post.likes = post.likes.filter(function (_ref) {
            var user = _ref.user;
            return user.toString() !== req.user.id;
          });
          _context8.next = 9;
          return regeneratorRuntime.awrap(post.save());

        case 9:
          return _context8.abrupt("return", res.json(post.likes));

        case 12:
          _context8.prev = 12;
          _context8.t0 = _context8["catch"](0);
          console.error(_context8.t0.message);
          res.status(500).send('Server Error');

        case 16:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 12]]);
}); //  @route  POST api/post/comment/:id
//  @desc   create a comment on a post
//  @access private

router.post('/comment/:id', [auth, [check('text', 'Text is required').not().isEmpty()]], function _callee9(req, res) {
  var errors, user, post, newComment;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context9.next = 3;
            break;
          }

          return _context9.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _context9.prev = 3;
          _context9.next = 6;
          return regeneratorRuntime.awrap(User.findById(req.user.id).select('-password'));

        case 6:
          user = _context9.sent;
          _context9.next = 9;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 9:
          post = _context9.sent;
          newComment = {
            text: req.body.text,
            title: req.body.title,
            name: user.name,
            user: req.user.id
          };
          post.comments.unshift(newComment);
          _context9.next = 14;
          return regeneratorRuntime.awrap(post.save());

        case 14:
          res.json(post.comments);
          _context9.next = 21;
          break;

        case 17:
          _context9.prev = 17;
          _context9.t0 = _context9["catch"](3);
          console.error(_context9.t0);
          res.status(500).send('Server error');

        case 21:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[3, 17]]);
}); //  @route  POST api/post/comment/:id/:comment_id
//  @desc   Delete a comment on a post
//  @access private

router["delete"]('/comment/:id/:comment_id', auth, function _callee10(req, res) {
  var user, post, comment;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.user.id).select('-password'));

        case 3:
          user = _context10.sent;
          _context10.next = 6;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 6:
          post = _context10.sent;
          //Pull out comment
          comment = post.comments.find(function (comment) {
            return comment.id === req.params.comment_id;
          });

          if (comment) {
            _context10.next = 10;
            break;
          }

          return _context10.abrupt("return", res.status(404).json({
            msg: "Comment does not exists"
          }));

        case 10:
          if (!(comment.user.toString() != req.user.id)) {
            _context10.next = 12;
            break;
          }

          return _context10.abrupt("return", res.status(401).json({
            msg: "User not authorized"
          }));

        case 12:
          post.comments = post.comments.filter(function (_ref2) {
            var _id = _ref2._id;
            return _id.toString() !== req.params.comment_id;
          });
          _context10.next = 15;
          return regeneratorRuntime.awrap(post.save());

        case 15:
          return _context10.abrupt("return", res.json(post));

        case 18:
          _context10.prev = 18;
          _context10.t0 = _context10["catch"](0);
          console.error(_context10.t0);
          res.status(500).send('Server error');

        case 22:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 18]]);
}); //  @route  POST api/post/upload
//  @desc   upload a file for a post
//  @access private

var s3 = new aws.S3({
  apiVersion: '2006-03-01',
  accessKeyId: '',
  secretAccessKey: ''
}); // Needs AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'schoolproject',
    metadata: function metadata(req, file, cb) {
      cb(null, {
        fieldName: file.fieldname
      });
    },
    key: function key(req, file, cb) {
      var ext = path.extname(file.originalname);
      cb(null, "".concat(uuid()).concat(ext));
    }
  })
});
router.post('/upload', upload.array('avatar'), function (req, res) {
  return res.json({
    status: 'OK',
    uploaded: req.files.length,
    Loc: req.files
  });
}); //  @route  POST api/post/chat
//  @desc   send a chat
//  @access private

router.post('/chat', auth, function _callee11(req, res) {
  var user, newChat, chat;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.user.id).select('-password'));

        case 3:
          user = _context11.sent;
          console.log(user, 'THIS IS THE USER LOG');
          newChat = new Chat({
            text: req.body.text,
            user: user.id,
            name: user.name
          });
          _context11.next = 8;
          return regeneratorRuntime.awrap(newChat.save());

        case 8:
          chat = _context11.sent;
          res.json({
            chat: chat
          });
          _context11.next = 16;
          break;

        case 12:
          _context11.prev = 12;
          _context11.t0 = _context11["catch"](0);
          console.error(_context11.t0);
          res.status(500).send('Server error');

        case 16:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 12]]);
}); //  @route  Get api/post/chat
//  @desc   get all chat
//  @access private

router.get('/chat/all', auth, function _callee12(req, res) {
  var chats;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return regeneratorRuntime.awrap(Chat.find().sort({
            date: -1
          }));

        case 3:
          chats = _context12.sent;
          res.json(chats);
          _context12.next = 11;
          break;

        case 7:
          _context12.prev = 7;
          _context12.t0 = _context12["catch"](0);
          console.error(_context12.t0);
          res.status(500).send('Server error');

        case 11:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = router;