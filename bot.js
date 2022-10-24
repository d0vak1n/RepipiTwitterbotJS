var Twit = require('twit');
//const auth = require('./config');
//const bdwds = require('./badwords');
const { fork } = require('child_process');



fork("./badwords.js");

console.log("Bot iniciado, indexando insultos en idioma español :)");
