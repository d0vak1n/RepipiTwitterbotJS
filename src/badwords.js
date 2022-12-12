var fs = require('fs');
// const { stringify } = require('querystring');
const auth = require('../config');

var wordofhour;

function getLang() {
  let arrayLang = ['ESP', 'ARG'];
  let aleat = Math.round(Math.random() * (arrayLang.length - 1));
  let lang = arrayLang[aleat];
  console.log('We decided to use ' + lang);
  return lang;
}

function getDataSet(filelang) {
  let arraypal = fs.readFileSync('./dataset/' + filelang + '.txt').toString().split("\n");
  return arraypal;
}

function twitAndRetwitWord() {
  auth.connexionDB();
  console.log("Getting a badword...");
  var arraybadwords = getDataSet(getLang());
  var aleat = Math.round(Math.random() * (arraybadwords.length - 1));
  wordofhour = arraybadwords[aleat];

  auth.T.post(
    'statuses/update', {
    status: 'En la hora que viene, te declaro une: ' + wordofhour
  },
    function (err, data, response) {
      data => { }
      searchTwitsWithWord(wordofhour);
      console.log("En la hora que viene, te declaro une: " + wordofhour);
      console.log("Esperando " + auth.intervalo + " segundos");

    })
}

function searchTwitsWithWord(palabra) {
  auth.T.get('search/tweets', { q: '' + palabra + ' since:2011-07-11', count: 2 }, function (err, data, response) {
    const datos = data;
    let i = 0;
    while (i < datos.statuses.length) {
      console.log(datos.statuses[i].text);
      console.log(datos.statuses[i].id_str);
      saveToDb(datos.statuses[i].id_str, datos.statuses[i].text, palabra);
      retweetWord(datos.statuses[i].id_str);
      i++;
    }
  })
}

function retweetWord(id) {
  auth.T.post('statuses/retweet/:id', { id: id }, function (err, data, response) {
  })
}

function saveToDb(idtwit, texttwit, palabra) {
  var query = 'INSERT INTO `twits`(`rowid`, `idtweet`, `tweet`, `palabra`) VALUES (NULL,' + idtwit + ',\'' + texttwit + '\',\'' + palabra + '\')';
  auth.conn.query(query);
  console.log("Guardando en la base de datos");
}

// twitAndRetwitWord();
setInterval(twitAndRetwitWord, auth.intervalo);