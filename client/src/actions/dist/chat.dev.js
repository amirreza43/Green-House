"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addChat = exports.getChat = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _types = require("./types");

var _alert = require("./alert");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//Get chat
var getChat = function getChat() {
  return function _callee(dispatch) {
    var res;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].get('/api/post/chat/all'));

          case 3:
            res = _context.sent;
            console.log(res);
            dispatch({
              type: _types.GET_CHAT,
              payload: res.data
            });
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 8]]);
  };
}; //Add chat


exports.getChat = getChat;

var addChat = function addChat(formData) {
  return function _callee2(dispatch) {
    var config, res;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log('addChat', formData);
            _context2.prev = 1;
            config = {
              headers: {
                'Content-type': 'application/json'
              }
            };
            _context2.next = 5;
            return regeneratorRuntime.awrap(_axios["default"].post("/api/post/chat", formData, config));

          case 5:
            res = _context2.sent;
            dispatch({
              type: _types.POST_CHAT,
              payload: res.data
            });
            dispatch((0, _alert.setAlert)('Chat Sent', 'success'));
            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](1);
            dispatch({
              type: _types.POST_ERROR,
              payload: {
                msg: _context2.t0.response.statusText,
                status: _context2.t0.response.status
              }
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[1, 10]]);
  };
};

exports.addChat = addChat;