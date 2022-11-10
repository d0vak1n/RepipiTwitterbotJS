//
// Made with Twit by Raul
//
const { fork } = require('child_process');
const { createClient } = require("redis");

const db = require('./dbconnect');


const redisClient = createClient({
   url: db.con.REDIS_URL,
});


fork("./badwords.js");

console.log("                                                                ");
console.log("██████╗ ███████╗██████╗ ██╗██████╗ ██╗██████╗  ██████╗ ████████╗");
console.log("██╔══██╗██╔════╝██╔══██╗██║██╔══██╗██║██╔══██╗██╔═══██╗╚══██╔══╝");
console.log("██████╔╝█████╗  ██████╔╝██║██████╔╝██║██████╔╝██║   ██║   ██║   ");
console.log("██╔══██╗██╔══╝  ██╔═══╝ ██║██╔═══╝ ██║██╔══██╗██║   ██║   ██║   ");
console.log("██║  ██║███████╗██║     ██║██║     ██║██████╔╝╚██████╔╝   ██║   ");
console.log("╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚═╝     ╚═╝╚═════╝  ╚═════╝    ╚═╝   ");
console.log("                                                                ");

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();

console.log("Redis connected");

console.log("Bot iniciado, indexando insultos en idioma español :)");

