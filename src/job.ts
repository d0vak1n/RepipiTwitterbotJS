/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { T as client /* conn, connexionDB */ } from "../config";
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
    .split("\n");
  return arraypal;
}

async function twitAndRetwitWord() {
  console.log("Getting a badword...");
  let arraybadwords = getDataSet(getLang());
  let aleat = Math.round(Math.random() * (arraybadwords.length - 1));
  let wordofhour = arraybadwords[aleat];
  console.log("Word is " + wordofhour);

  client.v2.tweet("Que te pasa, " + wordofhour + "?");
}

cron.schedule("0 * * * *", () => {
  console.log(" ");
  twitAndRetwitWord();
  console.log(" ");
});
