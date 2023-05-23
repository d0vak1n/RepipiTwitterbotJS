import fs from 'fs';
// const { stringify } = require('querystring');
import auth from "../config";

function getLang() {
  let arrayLang = ["ESP", "ARG"];
  let aleat = Math.round(Math.random() * (arrayLang.length - 1));
  let lang = arrayLang[aleat];
  console.log("We decided to use " + lang);
  return lang;
}

function getDataSet(filelang:any) {
  let arraypal = fs
    .readFileSync("./dataset/" + filelang + ".txt")
    .toString()
    .split("\n");
  return arraypal;
}

function twitAndRetwitWord() {
  auth.connexionDB();
  console.log("Getting a badword...");
  var arraybadwords = getDataSet(getLang());
  var aleat = Math.round(Math.random() * (arraybadwords.length - 1));
  let wordofhour = arraybadwords[aleat];

  auth.T.post(
    "statuses/update",
    {
      status: "En la hora que viene, te declaro une: " + wordofhour,
    },
    function (err:any, data:any, response:any) {
      (data:any) => {};
      searchTwitsWithWord(wordofhour);
      console.log("En la hora que viene, te declaro une: " + wordofhour);
      console.log("Esperando " + auth.intervalo + " segundos");
    }
  );
}

function searchTwitsWithWord(palabra:string) {
  auth.T.get(
    "search/tweets",
    { q: "" + palabra + " since:2011-07-11", count: 2 },
    function (err:any, data:any, response:any) {
      const datos = data;
      let i = 0;
      while (i < datos.statuses.length) {
        console.log(datos.statuses[i].text);
        console.log(datos.statuses[i].id_str);
        saveToDb(datos.statuses[i].id_str, datos.statuses[i].text, palabra);
        retweetWord(datos.statuses[i].id_str);
        i++;
      }
    }
  );
}

function retweetWord(id:any) {
  auth.T.post(
    "statuses/retweet/:id",
    { id: id },
    function (err:any, data:any, response:any) {}
  );
}

function saveToDb(idtwit:number, texttwit:string, palabra:string) {
  var query =
    "INSERT INTO `twits`(`rowid`, `idtweet`, `tweet`, `palabra`) VALUES (NULL," +
    idtwit +
    ",'" +
    texttwit +
    "','" +
    palabra +
    "')";
  auth.conn.query(query);
  console.log("Guardando en la base de datos");
}

//twitAndRetwitWord();
setInterval(twitAndRetwitWord, auth.intervalo);
