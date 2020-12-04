var express = require('express');
var router = express.Router();

var fs  = require('fs');
var path = require('path')
var key = fs.readFileSync(path.join(__dirname, 'Path to private key'))
var cert = fs.readFileSync(path.join(__dirname, 'Path to private cert'))
var rootCa = fs.readFileSync(path.join(__dirname, 'Path to root CA'))


var options = {
  key,
  cert,
  rootCa,
};

/* Send certs. */
router.get('/certs', function(req, res, next) {
  res.send(options);
});

module.exports = router;
