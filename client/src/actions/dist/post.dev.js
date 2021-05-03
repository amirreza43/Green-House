"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteComment = exports.addComment = exports.getPost = exports.removeLike = exports.addLike = exports.addMessage = exports.getMessages = exports.addPost = exports.deletePost = exports.getPosts = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _axios = _interopRequireDefault(require("axios"));

var _alert = require("./alert");

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getPosts = function getPosts() {
  return function _callee(dispatch) {
    var res;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].get('/api/post'));

          case 3:
            res = _context.sent;
            dispatch({
              type: _types.GET_POSTS,
              payload: res.data
            });
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            dispatch({
              type: _types.POST_ERROR,
              payload: {
                msg: _context.t0.response.statusText,
                status: _context.t0.response.status
              }
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 7]]);
  };
}; //Delete post


exports.getPosts = getPosts;

var deletePost = function deletePost(id) {
  return function _callee2(dispatch) {
    var res;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            console.log(id);
            _context2.next = 4;
            return regeneratorRuntime.awrap(_axios["default"]["delete"]("/api/post/".concat(id)));

          case 4:
            res = _context2.sent;
            dispatch({
              type: _types.DELETE_POST,
              payload: id
            });
            dispatch((0, _alert.setAlert)('Post Removed', 'success'));
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            dispatch({
              type: _types.POST_ERROR,
              payload: {
                msg: _context2.t0.response.statusText,
                status: _context2.t0.response.status
              }
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 9]]);
  };
}; //Add post


exports.deletePost = deletePost;

var addPost = function addPost(formData) {
  return function _callee3(dispatch) {
    var config, res;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            config = {
              headers: {
                'Content-type': 'application/json'
              }
            };
            _context3.next = 4;
            return regeneratorRuntime.awrap(_axios["default"].post('/api/post', formData, config));

          case 4:
            res = _context3.sent;
            dispatch({
              type: _types.ADD_POST,
              payload: res.data
            });
            dispatch((0, _alert.setAlert)('Post Created', 'success'));
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            dispatch({
              type: _types.POST_ERROR,
              payload: {
                msg: _context3.t0.response.statusText,
                status: _context3.t0.response.status
              }
            });

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 9]]);
  };
}; //Get all messages


exports.addPost = addPost;

var getMessages = function getMessages() {
  return function _callee4(dispatch) {
    var res;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].get('/api/post/message'));

          case 3:
            res = _context4.sent;
            console.log(res);
            dispatch({
              type: _types.GET_MESSAGES,
              payload: res.data
            });
            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            dispatch({
              type: _types.POST_ERROR,
              payload: {
                msg: _context4.t0.response.statusText,
                status: _context4.t0.response.status
              }
            });

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 8]]);
  };
}; //Add Message


exports.getMessages = getMessages;

var addMessage = function addMessage(formData) {
  return function _callee5(dispatch) {
    var receiver, form, config, res;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            console.log('addMessage', formData);
            receiver = formData.userid;
            form = new FormData();
            form.append('text', formData.text);
            _context5.prev = 4;
            config = {
              headers: {
                'Content-type': 'application/json'
              }
            };
            _context5.next = 8;
            return regeneratorRuntime.awrap(_axios["default"].post("/api/post/message/".concat(receiver), {
              'text': formData.text
            }));

          case 8:
            res = _context5.sent;
            dispatch({
              type: _types.ADD_Message,
              payload: res.data
            });
            dispatch((0, _alert.setAlert)('Message Sent', 'success'));
            _context5.next = 16;
            break;

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](4);
            dispatch({
              type: _types.POST_ERROR,
              payload: {
                msg: _context5.t0.response.statusText,
                status: _context5.t0.response.status
              }
            });

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[4, 13]]);
  };
}; // Add like


exports.addMessage = addMessage;

var addLike = function addLike(id) {
  return function _callee6(dispatch) {
    var res;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].put("/api/post/like/".concat(id)));

          case 3:
            res = _context6.sent;
            dispatch({
              type: _types.UPDATE_LIKES,
              payload: {
                id: id,
                likes: res.data
              }
            });
            _context6.next = 10;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            dispatch({
              type: _types.POST_ERROR,
              payload: {
                msg: _context6.t0.response.statusText,
                status: _context6.t0.response.status
              }
            });

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[0, 7]]);
  };
}; // Remove like


exports.addLike = addLike;

var removeLike = function removeLike(id) {
  return function _callee7(dispatch) {
    var res;
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].put("/api/post/unlike/".concat(id)));

          case 3:
            res = _context7.sent;
            dispatch({
              type: _types.UPDATE_LIKES,
              payload: {
                id: id,
                likes: res.data
              }
            });
            _context7.next = 10;
            break;

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            dispatch({
              type: _types.POST_ERROR,
              payload: {
                msg: _context7.t0.response.statusText,
                status: _context7.t0.response.status
              }
            });

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, null, null, [[0, 7]]);
  };
};

exports.removeLike = removeLike;

var getPost = function getPost(id) {
  return function _callee8(dispatch) {
    var res;
    return regeneratorRuntime.async(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].get("/api/post/".concat(id)));

          case 3:
            res = _context8.sent;
            dispatch({
              type: _types.GET_POST,
              payload: res.data
            });
            _context8.next = 10;
            break;

          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8["catch"](0);
            dispatch({
              type: _types.POST_ERROR,
              payload: {
                msg: _context8.t0.response.statusText,
                status: _context8.t0.response.status
              }
            });

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, null, null, [[0, 7]]);
  };
}; //Add Commment


exports.getPost = getPost;

var addComment = function addComment(PostId, formData) {
  return function _callee9(dispatch) {
    var config, res;
    return regeneratorRuntime.async(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            config = {
              headers: {
                'Content-type': 'application/json'
              }
            };
            _context9.next = 4;
            return regeneratorRuntime.awrap(_axios["default"].post("/api/post/comment/".concat(PostId), formData, config));

          case 4:
            res = _context9.sent;
            dispatch({
              type: _types.ADD_COMMMENT,
              payload: res.data
            });
            dispatch((0, _alert.setAlert)('Comment Added', 'success'));
            _context9.next = 12;
            break;

          case 9:
            _context9.prev = 9;
            _context9.t0 = _context9["catch"](0);
            dispatch({
              type: _types.POST_ERROR,
              payload: {
                msg: _context9.t0.response.statusText,
                status: _context9.t0.response.status
              }
            });

          case 12:
          case "end":
            return _context9.stop();
        }
      }
    }, null, null, [[0, 9]]);
  };
}; //delete Commment


exports.addComment = addComment;

var deleteComment = function deleteComment(PostId, commentId) {
  return function _callee10(dispatch) {
    var res;
    return regeneratorRuntime.async(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return regeneratorRuntime.awrap(_axios["default"]["delete"]("/api/post/comment/".concat(PostId, "/").concat(commentId)));

          case 3:
            res = _context10.sent;
            dispatch({
              type: _types.REMOVE_COMMENT,
              payload: commentId
            });
            dispatch((0, _alert.setAlert)('Comment Removed', 'success'));
            _context10.next = 11;
            break;

          case 8:
            _context10.prev = 8;
            _context10.t0 = _context10["catch"](0);
            dispatch({
              type: _types.POST_ERROR,
              payload: {
                msg: _context10.t0.response.statusText,
                status: _context10.t0.response.status
              }
            });

          case 11:
          case "end":
            return _context10.stop();
        }
      }
    }, null, null, [[0, 8]]);
  };
};

exports.deleteComment = deleteComment;