var
  c = require('../config.json'),
  sha1 = require('sha1');


function Switcheroo() {}


/* ####################################################### */

Switcheroo.prototype.authLevel = 0;

Switcheroo.prototype.getAuthLevel = function(){
  return this.authLevel;
};

Switcheroo.prototype.doLogin = function(){
  this.authLevel = 1;
};

Switcheroo.prototype.tryAuth = function(authHash){
  var requiredHash = c.webInterface.authHash;
  var hash = sha1(authHash);

  if (hash == requiredHash) {
    this.doLogin();
    return true;
  }

  return false;
};

/* ####################################################### */



module.exports = new Switcheroo();
