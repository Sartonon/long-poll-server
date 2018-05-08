const express = require('express');
const cors = require('cors');
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
  messageBus.once('message', data => {
    res.json(data);
  });
});

router.post('/messages', (req, res) => {
  messages.push(req.body);
  messageBus.emit('message', req.body);
  res.status(200).end();
});

router.get('/pastMessages', (req, res) => {
  res.send(messages);
});

app.use('/', router);

app.listen(3005, () => console.log('Example app listening on port 3000!'));