require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const express = __webpack_require__(2);
const cors = __webpack_require__(3);
const _ = __webpack_require__(4);
const bodyParser = __webpack_require__(5);
const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

const messages = [];

const EventEmitter = __webpack_require__(6).EventEmitter;
const messageBus = new EventEmitter();
messageBus.setMaxListeners(100);

router.get('/', (req, res) => {
  res.send('/');
});

let receivingMessagesCount = 0;
let sendingMessagesCount = 0;
setInterval(() => {
  if (receivingMessagesCount || sendingMessagesCount) {
    console.log("Receiving messages count: ", receivingMessagesCount++);
    console.log("Sending messages count: ", sendingMessagesCount);
  }
  receivingMessagesCount = 0;
  sendingMessagesCount = 0;
}, 1000);

router.get('/messages', (req, res) => {
  receivingMessagesCount++;
  const index = messages.findIndex(message => message.id === req.query.id);
  console.log(messages.length);
  if (index === messages.length - 1 || index === -1) {
    messageBus.once('message', data => {
      res.json(data);
    });
  } else {
    res.send(messages.slice(index + 1));
  }
});

router.post('/messages', (req, res) => {
  sendingMessagesCount++;
  const data = req.body;
  data.id = _.uniqueId('message_');
  messages.push(data);
  messageBus.emit('message', [req.body]);
  res.status(200).end();
});

router.get('/pastMessages', (req, res) => {
  res.send(messages);
});

app.use('/', router);

app.listen(3005, () => console.log('Example app listening on port 3000!'));

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map