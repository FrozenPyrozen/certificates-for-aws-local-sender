var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

'use strict'

/** ************************** IMPORTANT NOTE ***********************************
  The certificate used on this example has been generated for a host named stark.
  So as host we SHOULD use stark if we want the server to be authorized.
  For testing this we should add on the computer running this example a line on
  the hosts file:
  /etc/hosts [UNIX]
  OR
  \System32\drivers\etc\hosts [Windows]
  The line to add on the file should be as follows:
  <the ip address of the server> stark
 *******************************************************************************/

var mqtt = require('mqtt')
var fs = require('fs')
var KEY = fs.readFileSync(path.join(__dirname, 'Path to private key'))
var CERT = fs.readFileSync(path.join(__dirname, 'Path to private cert'))
var TRUSTED_CA_LIST = fs.readFileSync(path.join(__dirname, 'Path to root CA'))

var PORT = 8883
var HOST = 'Write host here'

// Connect to mqtt
var options = {
  port: PORT,
  host: HOST,
  key: KEY,
  cert: CERT,
  rejectUnauthorized: true,
  // The CA list will be used to determine if server is authorized
  ca: TRUSTED_CA_LIST,
  protocol: 'mqtts'
}

var client = mqtt.connect(options)
client.subscribe('*')
client.subscribe('messages')
client.publish('messages', 'Current time is: ' + new Date())
client.on('message', function (topic, message) {
  console.log(message)
})

client.on('connect', function () {
  console.log('Mqtt Connected')
})

module.exports = app;
