var EventEmitter = require('events').EventEmitter,
    http = require('http');

// Global Events
global.loginEvt = new EventEmitter();
global.loggedIn = new EventEmitter();

// Global VARs
global.credentials = {};

loginEvt.on('login', (creds) => {
  // Verify We Can Login to UCCX Server
  var data = '';
  var request = http.request({
    host: creds.ip,
    path: '/adminapi/skill',
    method: 'GET',
    port: 80,
    auth: `${creds.user}:${creds.pass}`,
    headers: {
      'Accept' : 'application/json'
    },
  }, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log(data);
      loggedIn.emit('loggedIn', data);
    });
  });

  request.end();
});
