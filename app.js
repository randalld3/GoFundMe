var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var sqlite3 = require('sqlite3').verbose();
var logger = require('morgan');

var indexRouter = require('./routes/index');
var donationsRouter = require('./routes/donations');

var app = express();

const db = new sqlite3.Database('./database/donations.sqlite', sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.error("Error opening database", err.message);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/donations', donationsRouter);

app.listen(4000, () => {
  console.log('Server running on port 4000');
});

module.exports = app;
