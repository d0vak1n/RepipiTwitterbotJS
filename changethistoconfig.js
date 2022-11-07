//
//  ██████╗ ██████╗ ███╗   ██╗███████╗██╗ ██████╗ 
// ██╔════╝██╔═══██╗████╗  ██║██╔════╝██║██╔════╝ 
// ██║     ██║   ██║██╔██╗ ██║█████╗  ██║██║  ███╗
// ██║     ██║   ██║██║╚██╗██║██╔══╝  ██║██║   ██║
// ╚██████╗╚██████╔╝██║ ╚████║██║     ██║╚██████╔╝
//  ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝ ╚═════╝ 
// Change this file name to config.js
var Twit = require('twit');

var intervalo = 60/* Minutes */ * 60 /* Seconds */ * 1000;
var T = new Twit({
  consumer_key:         '---',
  consumer_secret:      '---',
  access_token:         '---',
  access_token_secret:  '---',
  timeout_ms:           60*60*1000,  // optional HTTP request timeout to apply to all requests
  strictSSL:            false,     // optional - requires SSL certificates to be valid
})

module.exports = { T ,intervalo };