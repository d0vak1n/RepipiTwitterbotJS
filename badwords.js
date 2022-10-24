var fs = require('fs');
const Twit = require('twit');
var arraybadwords = getDataSet("ESP");
var intervalo = 60*60 * 1000;
const auth = require('./config');
const { stringify } = require('querystring');
var wordofhour;

module.exports = { getDataSet, twitearPalabra, wordofhour };

function getDataSet(filelang) {
  arraypal = fs.readFileSync('./dataset/' + filelang + '.txt').toString().split("\n");
  return arraypal;
}


function twitearPalabra() {
  console.log("Se twitea");
  var aleat = Math.round(Math.random() * arraybadwords.length - 1);
  wordofhour = arraybadwords[aleat];

  auth.T.post(
    'statuses/update', {
    status: 'En la hora que viene, te declaro une: ' + wordofhour
  },
    function (err, data, response) {
      data => { }
      //console.log(data);
      console.log("Twit creado con la palabra: " + wordofhour);
      console.log("Esperando " + intervalo / 1000 + " segundos");
    })

  auth.T.get('search/tweets', { q: '' + wordofhour + ' since:2011-07-11', count: 5 }, function (err, data, response) {
    const datos = data;
    let i = 0;
    while (i < datos.statuses.length) {
      console.log(datos.statuses[i].text);
      i++;
    }
  })

}

setInterval(twitearPalabra, intervalo);