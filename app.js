
var http = require('http');
var express = require('express');
var path = require('path');
var static = require('serve-static');
var bodyParser = require('body-parser');
var cors = require('cors'); // 다른 서버로 접근하기위해서 사용
var fs = require('fs');
var hostname = '0.0.0.0';
const { constant, reject } = require('async');
var session = require('express-session');
var mysqlDB = require("./DB/db");
var nodemailer = require("./mail/mail");
var crypto = require('crypto');
var multer = require('multer');
const { resolve } = require('path');

var app = express();
var indexRouter = require('./routes/index')(app, mysqlDB, multer);
// var usersRouter = require('./routes/users');

app.use(session({
    secret: '@#@$sessKEY#@$#$',
    resave: false,
    saveUninitialized: true
}));

app.set('port', process.env.PORT || 8880);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('node_modules', express.static(path.join(__dirname, '/node_modules')))
app.set('views', __dirname + '/views');
app.set('views engin', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use('/', indexRouter);

//express run
http.createServer(app).listen(app.get('port'), function () {
    console.log("익스프레스로 웹 서버를 실행함 : " + app.get('port'));
})