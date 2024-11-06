let express = require('express');
let bodyParser = require('body-parser');
let app = express();
require('dotenv').config();

console.log('Hello World');

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', (req, res) => {
  if (process.env.MESSAGE_STYLE == 'uppercase') {
    res.json({ message: 'HELLO JSON' });
  } else {
    res.json({ message: 'Hello json' });
  }
});

app.get(
  '/now',
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);

app.get(
  '/:word/echo',
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ echo: req.params.word });
  }
);

app
  .get(
    '/name',
    function (req, res, next) {
      req.time = new Date().toString();
      next();
    },
    function (req, res) {
      res.json({ name: `${req.query.first ?? ''} ${req.query.last ?? ''}` });
    }
  )
  .post(
    '/name',
    function (req, res, next) {
      req.time = new Date().toString();
      next();
    },
    function (req, res) {
      res.json({ name: `${req.body.first ?? ''} ${req.body.last ?? ''}` });
    }
  );

app.use('/public', express.static(__dirname + '/public'));

module.exports = app;
