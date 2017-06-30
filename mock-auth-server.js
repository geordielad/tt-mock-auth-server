var express = require('express');
var app = express();
var fs = require('fs');
var https = require('https');
var http = require('http');
var ursa = require('ursa');
var urlencode = require('urlencode');

var config = require('./config');


app.use(express.static('public'));

if (config.protocol == 'https') {
  var sslPrivateKey  = fs.readFileSync(config.sslKeys.key, 'utf8');
  var sslCertificate = fs.readFileSync(config.sslKeys.cert, 'utf8');
  var sslCredentials = {key: sslPrivateKey, cert: sslCertificate};

  var httpsServer = https.createServer(sslCredentials, app);

  var server = httpsServer.listen(config.port, function () {
    console.log('HTTPS Auth server listening on port ',config.port);
  });
}
else {
  var httpServer = http.createServer(app);

  var server = httpServer.listen(config.port, function () {
    console.log('HTTP Auth server listening on port ',config.port);
  });
}

if (config.encUsernameFlag) {
  //var encPrivateKey = fs.readFileSync(config.encKeys.key, 'utf8');
  var encPublicKey = fs.readFileSync(config.encKeys.cert, 'utf8');

  //var ursaKey = ursa.createPrivateKey(encPrivateKey);
  var ursaCrt = ursa.createPublicKey(encPublicKey);

}

// Just serves a bit of html that loads js. That's all.
app.get('/', function (req, res) {
  console.log(req.query.host);
  console.log(req.query.port);
  console.log(req.query.proto);

  res.send("<script>var proxyHost = '"+req.query.proto+"://"+req.query.host+":"+req.query.port+"';var proxySite = '"+req.query.site+"';</script><script src='auth-page.js'></script>");
});

// Get Username without prompting. Perhaps its in a header.
// If the username is accessible to the Ticketing Agent then this module is not needed
// Here we get it out of config and optionally encrypt it before sending it to the Ticketing Agent
app.get('/login', function (req, res) {
  console.log('req.query.host: ',req.query.host);
  console.log('req.query.port: ',req.query.port);
  console.log('req.query.proto: ',req.query.proto);
  console.log('req.query.site: ',req.query.site);
  console.log('req.query.redirect: ',req.query.redirect);

  var username = config.tableauUsername;

  if (config.encUsernameFlag) {
    // We are going to do a Public Key Encryption with a Private Key Decryption at the other end
    username = ursaCrt.encrypt("rcottiss@tableau.rocks", 'utf8', 'base64');
  }

  res.send("<script>var proxyHost = '"+req.query.proto+"://"+req.query.host+":"+req.query.port+"';var proxySite = '"+req.query.site+"';var encUsername = '"+urlencode(username)+"';</script><script src='auth-page2.js'></script>");

  //res.redirect('https://'+req.query.host+'/login-to-tableau-server/'+encUsername+'?');
});
