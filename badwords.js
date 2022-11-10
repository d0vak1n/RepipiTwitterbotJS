var fs = require('fs');
const auth = require('./config');
const db = require('./config');

var arraybadwords = getDataSet("ESP");
var wordofhour;

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
      buscaPalabra(wordofhour);
      console.log("En la hora que viene, te declaro une: " + wordofhour);
      console.log("Esperando " + auth.intervalo  + " segundos");

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

function saveToDb() {
  console.log("Guardando en la base de datos");
}


setInterval(twitearPalabra, auth.intervalo);