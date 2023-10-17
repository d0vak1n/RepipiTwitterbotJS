/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";

function getLang(): string {
  const arrayLang = ["ESP"];
  let aleat: number = Math.round(Math.random() * (arrayLang.length - 1));
  let lang: string = arrayLang[aleat];
  console.log("We decided to use " + lang);
  return lang;
}

function getDataSet(filelang: string): string[] {
  const arraypal: string[] = [];
  const readcontent: string = fs.readFileSync(
    "./dataset/" + filelang + ".txt",
    "utf-8",
  );
  console.log(readcontent);
  const arraycontent: Array<string> = readcontent.split("\r\n");
  console.log(arraycontent);
  arraycontent.forEach((arraypal: string) => {
    arraypal.push(arraypal.replace("\r", ""));
  });
  return arraypal;
}

export async function twitAndRetwitWord() {
  console.log("Getting a badword...");
  let arraybadwords = getDataSet(getLang());
  let aleat = Math.round(Math.random() * (arraybadwords.length - 1));
  let wordofhour = arraybadwords[aleat];
  console.log("---" + wordofhour + "---");
  console.log("Word is " + wordofhour);
  console.log("Que te pasa, " + wordofhour + "?");
}

twitAndRetwitWord();
