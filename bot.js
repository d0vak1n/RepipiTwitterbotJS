var Twit = require('twit');
const auth = require('./config');
const bdwds = require('./badwords');

var arraybadwords = bdwds.getDataSet("ESP");

console.log("Bot iniciado, indexando insultos en idioma español");

function twitearPalabra() {

  var aleat = Math.round(Math.random()*arraybadwords.length-1);
  var wordofhour = arraybadwords[aleat];

  auth.T.post(
    'statuses/update', {
    status: 'La palabra de esta hora es: ' + wordofhour
  },
    function (err, data, response) {
      data => { }
      console.log(data);
    })
}

setInterval(twitearPalabra, 120*1000);
