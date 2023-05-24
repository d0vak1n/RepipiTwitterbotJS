//
//  ██████╗ ██████╗ ███╗   ██╗███████╗██╗ ██████╗
// ██╔════╝██╔═══██╗████╗  ██║██╔════╝██║██╔════╝
// ██║     ██║   ██║██╔██╗ ██║█████╗  ██║██║  ███╗
// ██║     ██║   ██║██║╚██╗██║██╔══╝  ██║██║   ██║
// ╚██████╗╚██████╔╝██║ ╚████║██║     ██║╚██████╔╝
//  ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝ ╚═════╝
// Change this to config.js

var Twit = require("twit");
var mysql = require("mysql");

var intervalo = 60 /* Minutes */ * 10 /* Seconds */ * 1000;
var T = new Twit({
  consumer_key: "---",
  consumer_secret: "---",
  access_token: "---",
  access_token_secret: "---",
  timeout_ms: 60 * 60 * 1000, // optional HTTP request timeout to apply to all requests
  strictSSL: false, // optional - requires SSL certificates to be valid
});

var conn = mysql.createConnection({
  host: "---",
  user: "---",
  password: "---",
  database: "---",
  port: 3306,
});

function connexionDB() {
  conn.connect(function (err: any) {
    if (err) {
      return console.error("error: " + err.message);
    }

    console.log("Conectado a la base de datos");
  });
}

export = { T, intervalo, conn, connexionDB };
