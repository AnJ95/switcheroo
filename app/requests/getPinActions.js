var
  extend = require('extend'),
  request = require('./request.js'),
  c = require('../../config.json');


function GetPinActions () {};

extend(true, request, GetPinActions);

/* ####################################################### */

module.exports = new GetPinActions();
