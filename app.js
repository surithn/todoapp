var path = require('path');
var express  = require('express');
var mongoose = require('mongoose');
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var database = require('./config/database');
// var todoController = require('./controller/todo');
var secret = require('./config/authsecret');

mongoose.connect(database.url);
var app      = express();
app.use(express.static(path.join(__dirname,'public'))); 
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(session({ secret: 'my_precious' , key: 'sid', cookie: { secure: false }}));
require('./routes.js')(app);
app.listen(secret.port);
console.log("App listening on port : " + secret.port);