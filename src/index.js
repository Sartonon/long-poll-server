const express = require('express');
const cors = require('cors');
const _ = require('lodash');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

const messages = [];

const EventEmitter = require('events').EventEmitter;
const messageBus = new EventEmitter();
messageBus.setMaxListeners(100);

router.get('/', (req, res) => {
  res.send('/');
});

router.get('/messages', (req, res) => {
  const index =  messages.findIndex(message => message.id === req.query.id);
  console.log(index);
  console.log(messages);
  if (index === messages.length - 1 || index === -1) {
    messageBus.once('message', data => {
      res.json(data);
    });
  } else {
    res.send(messages.slice(index + 1));
  }
});

router.post('/messages', (req, res) => {
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