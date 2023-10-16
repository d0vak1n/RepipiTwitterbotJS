/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";

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
  console.log(arraypal);
  return arraypal;
}

export async function twitAndRetwitWord() {
  console.log("Getting a badword...");
  let arraybadwords = getDataSet(getLang());
  let aleat = Math.round(Math.random() * (arraybadwords.length - 1));
  let wordofhour = arraybadwords[aleat];
  console.log("---" + wordofhour + "---");
  console.log("Word is " + wordofhour);
}

twitAndRetwitWord();
