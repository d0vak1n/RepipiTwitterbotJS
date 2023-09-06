//
//  ██████╗ ██████╗ ███╗   ██╗███████╗██╗ ██████╗
// ██╔════╝██╔═══██╗████╗  ██║██╔════╝██║██╔════╝
// ██║     ██║   ██║██╔██╗ ██║█████╗  ██║██║  ███╗
// ██║     ██║   ██║██║╚██╗██║██╔══╝  ██║██║   ██║
// ╚██████╗╚██████╔╝██║ ╚████║██║     ██║╚██████╔╝
//  ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝ ╚═════╝
// Change this to config.js
import TwitterApi from "twitter-api-v2";
// var Twit = require("twit");
var mysql = require("mysql");

var intervalo = 60 /* Minutes */ * 10 /* Seconds */ * 1000;

export const T = new TwitterApi({
  appKey: "6B9dq1mnzBHmnyieQhCYL7LzX",
  appSecret: "XMrWekjxNnxBO8VYVmK62jSQgtjPgeHoNdc9WJKeHA8DQ3hLzi",
  // Following access tokens are not required if you are
  // at part 1 of user-auth process (ask for a request token)
  // or if you want a app-only client (see below)
  accessToken: "1583402583502241793-AgQOrn6MGHtJm5Xbu74nUglB3vX0ua",
  accessSecret: "VBRuBrLfYpsawbJ9ps1zYj2JMaQvwAtaM3mvLUawOyVpY",
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
