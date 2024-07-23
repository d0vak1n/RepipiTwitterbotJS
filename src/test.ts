import fs from "fs";

function getLang(): string {
  const arrayLang = ["ESP"];
  const aleat: number = Math.round(Math.random() * (arrayLang.length - 1));
  const lang: string = arrayLang[aleat];
  console.log("We decided to use " + lang);
  return lang;
}

function getDataSet(filelang: string) {
  const arraypal: string[] = fs
    .readFileSync("./dataset/" + filelang + ".txt")
    .toString()
    .split(/\r?\n/);
  return arraypal;
}


async function twitAndRetwitWord() {
  console.log("Getting a badword...");
  const arraybadwords = getDataSet(getLang());
  const aleat = Math.round(Math.random() * (arraybadwords.length - 1));
  console.log(aleat);
  const wordofhour = arraybadwords[aleat];
  console.log("Word is " + wordofhour);
  console.log("Que te pasa, " + wordofhour + "?");
}

twitAndRetwitWord();
