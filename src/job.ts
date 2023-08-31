import {T as client, conn, connexionDB} from "../config";
import fs from "fs";
import TwitterApi from "twitter-api-v2";

function getLang() {
    let arrayLang = ["ESP"];
    let aleat = Math.round(Math.random() * (arrayLang.length - 1));
    let lang = arrayLang[aleat];
    console.log("We decided to use " + lang);
    return lang;
  }

function getDataSet(filelang: any) {
    let arraypal = fs
      .readFileSync("./dataset/" + filelang + ".txt")
      .toString()
      .split("\r\n");
    return arraypal;
  }


 // const twitterRepipi = new TwitterApi('1583402583502241793-ksq9tGBt6gUoQJDtWZTgfL0bm5jq26');

async function twitAndRetwitWord() {

  let lang = await getLang();
  let arraypal = await getDataSet(lang);

//  connexionDB();
  console.log("Getting a badword...");
  var arraybadwords = getDataSet(getLang());
  var aleat = Math.round(Math.random() * (arraybadwords.length - 1));
  let wordofhour = arraybadwords[aleat];
  console.log("Word is "+wordofhour);
  
  client.v2.tweet("Que te pasa en la cara "+wordofhour);
}

setInterval(twitAndRetwitWord, 1*60*60*1000);


