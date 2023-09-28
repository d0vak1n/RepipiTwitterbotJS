//
//  ██████╗ ██████╗ ███╗   ██╗███████╗██╗ ██████╗
// ██╔════╝██╔═══██╗████╗  ██║██╔════╝██║██╔════╝
// ██║     ██║   ██║██╔██╗ ██║█████╗  ██║██║  ███╗
// ██║     ██║   ██║██║╚██╗██║██╔══╝  ██║██║   ██║
// ╚██████╗╚██████╔╝██║ ╚████║██║     ██║╚██████╔╝
//  ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝ ╚═════╝
// Change this to config.js
import TwitterApi from "twitter-api-v2";
import dotenv from "dotenv";
import mysql from "mysql";

//const intervalo = 60 /* Minutes */ * 10 /* Seconds */ * 1000;

dotenv.config();
export const T = new TwitterApi({
  appKey: `${process.env.API_KEY}`,
  appSecret: `${process.env.API_SECRET}`,
  // Following access tokens are not required if you are
  // at part 1 of user-auth process (ask for a request token)
  // or if you want a app-only client (see below)
  accessToken: `${process.env.ACCESS_TOKEN}`,
  accessSecret: `${process.env.ACCESS_SECRET}`,
});

export const conn = mysql.createConnection({
  host: `${process.env.HOST}`,
  user: `${process.env.USER}`,
  password: `${process.env.PASSWORD}`,
  database: `${process.env.DATABASE}`,
  port: 3306,
});

export function connexionDB() {
  conn.connect(function (err: any) {
    if (err) {
      return console.error("error: " + err.message);
    }

    console.log("Conectado a la base de datos");
  });
}
