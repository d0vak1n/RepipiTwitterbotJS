/* eslint-disable prefer-const */
import { T as client } from "../config";
import fs from "fs";

function getLang(): string {
  const arrayLang: string[] = ["ESP"];
  let aleat: number = Math.round(Math.random() * (arrayLang.length - 1));
  let lang: string = arrayLang[aleat];
  console.log("We decided to use " + lang);
  return lang;
}

function getDataSet(filelang: string) {
  const arraypal: string[] = fs
    .readFileSync("./dataset/" + filelang + ".txt")
    .toString()
    .split("\r\n");
  return arraypal;
}

export async function twitAndRetwitWord() {
  console.log("Getting a badword...");
  let arraybadwords: string[] = getDataSet(getLang());
  let aleat: number = Math.round(Math.random() * (arraybadwords.length - 1));
  let wordofhour: string = arraybadwords[aleat];
  console.log("Word is " + wordofhour);

  const tweet = await client.v2.tweet("Que te pasa, " + wordofhour + "?");
  const datatweet = tweet.data.id;

  return { datatweet };
}
