//
//  ██████╗ ██████╗ ███╗   ██╗███████╗██╗ ██████╗
// ██╔════╝██╔═══██╗████╗  ██║██╔════╝██║██╔════╝
// ██║     ██║   ██║██╔██╗ ██║█████╗  ██║██║  ███╗
// ██║     ██║   ██║██║╚██╗██║██╔══╝  ██║██║   ██║
// ╚██████╗╚██████╔╝██║ ╚████║██║     ██║╚██████╔╝
//  ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝ ╚═════╝
// Change this to config.js
import TwitterApi from 'twitter-api-v2';
// var Twit = require("twit");
var mysql = require("mysql");

var intervalo = 60 /* Minutes */ * 10 /* Seconds */ * 1000;

export const T = new TwitterApi({
  appKey: '---',
  appSecret: '---',
  // Following access tokens are not required if you are
  // at part 1 of user-auth process (ask for a request token)
  // or if you want a app-only client (see below)
  accessToken: '---',
  accessSecret: '---',
});

export var conn = mysql.createConnection({
  host: "---",
  user: "---",
  password: "---",
  database: "---",
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