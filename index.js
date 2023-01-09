const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const errorhandler = require('errorhandler');

const config = require("./config")

var isProduction = config.stage;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined'));
app.use(cors());
app.disable('etag');

app.use(express.static(__dirname+'/public', { extensions: ['html'] }));
app.use('/api', require('./routes'));
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (!isProduction) {
  app.use(errorhandler())
}

/// error handlers
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.sendFile(__dirname+'/public/error.html');
});

app.listen(config.port, () => {
  console.log('App started on port: ' + config.port)
});
