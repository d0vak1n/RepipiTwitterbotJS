var fs = require('fs');
const Twit = require('twit');
var arraybadwords = getDataSet("ESP");
var intervalo = 60 * 60 * 1000;
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
      buscaPalabra(wordofhour);
      console.log("Twit creado con la palabra: " + wordofhour);
      console.log("Esperando " + intervalo / 1000 + " segundos");

    })
}

function buscaPalabra(palabra) {
  auth.T.get('search/tweets', { q: '' + palabra + ' since:2011-07-11', count: 2 }, function (err, data, response) {
    const datos = data;
    let i = 0;
    while (i < datos.statuses.length) {
      console.log(datos.statuses[i].text);
      console.log(datos.statuses[i].id_str);
      retweeteaPalabra(datos.statuses[i].id_str)
      i++;
    }
  })
}




function retweeteaPalabra(id) {
  auth.T.post('statuses/retweet/:id', { id: id }, function (err, data, response) {
    console.log(data);
  })
}

setInterval(twitearPalabra, intervalo);