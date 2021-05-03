"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _alert = _interopRequireDefault(require("./alert"));

var _auth = _interopRequireDefault(require("./auth"));

var _profile = _interopRequireDefault(require("./profile"));

var _post = _interopRequireDefault(require("./post"));

var _message = _interopRequireDefault(require("./message"));

var _chat = _interopRequireDefault(require("./chat"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = (0, _redux.combineReducers)({
  alert: _alert["default"],
  auth: _auth["default"],
  profile: _profile["default"],
  post: _post["default"],
  message: _message["default"],
  chat: _chat["default"]
});

exports["default"] = _default;