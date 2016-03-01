'use strict';
var EventEmitter = require('events').EventEmitter,
    UCCX = require('csco-uccx');

// Global Events
global.loginEvt = new EventEmitter();
global.loggedIn = new EventEmitter();
global.skillEvt = new EventEmitter();

// Global VARs
global.credentials = {};
global.uccx = null;

loginEvt.on('login', (creds) => {
  // Verify We Can Login to UCCX Server
  let ip = creds.ip,
      user = creds.user,
      pass = creds.pass;
  uccx = UCCX({
    uri: `https://${creds.ip}/adminapi`,
    user: creds.user,
    pass: creds.pass
  });
  uccx.getStats()
    .then(resp => {
      credentials = {ip, user, pass};
      loggedIn.emit('loggedIn', resp)
    })
    .catch(err => loggedIn.emit('loginError', err))
});


skillEvt.on('skills', skills => {
  var ccxSkills = skills.map(skill => skill.skillName);
  skillEvt.emit('skillsList', ccxSkills);
})
