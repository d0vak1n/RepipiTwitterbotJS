/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { T as client, /* conn, connexionDB */ } from "../config";
import fs from "fs";
import cron from "node-cron";


function getLang() {
  const arrayLang = ["ESP"];
  let aleat = Math.round(Math.random() * (arrayLang.length - 1));
  let lang = arrayLang[aleat];
  console.log("We decided to use " + lang);
  return lang;
}

function getDataSet(filelang: any) {
  const arraypal = fs
    .readFileSync("./dataset/" + filelang + ".txt")
    .toString()
    .split("\r\n");
  return arraypal;
}

// const twitterRepipi = new TwitterApi('1583402583502241793-ksq9tGBt6gUoQJDtWZTgfL0bm5jq26');

async function twitAndRetwitWord() {
  //  connexionDB();
  console.log("Getting a badword...");
  let arraybadwords = getDataSet(getLang());
  console.log("array is " + arraybadwords);
  let aleat = Math.round(Math.random() * (arraybadwords.length - 1));
  console.log("lenght is " + arraybadwords.length);
  console.log("aleat is " + aleat);
  let wordofhour = arraybadwords[aleat];
  console.log("Word is " + wordofhour);
}

twitAndRetwitWord();
/*
cron.schedule('* * * * *', () => {
  console.log(' ');
  console.log('Starting again');
  console.log(' ');
  twitAndRetwitWord();
});
*/

