//
// Made with Twit by Raul
//
const { fork } = require('child_process');
const db = require('./config');

fork("./badwords.js");

console.log("                                                                ");
console.log("██████╗ ███████╗██████╗ ██╗██████╗ ██╗██████╗  ██████╗ ████████╗");
console.log("██╔══██╗██╔════╝██╔══██╗██║██╔══██╗██║██╔══██╗██╔═══██╗╚══██╔══╝");
console.log("██████╔╝█████╗  ██████╔╝██║██████╔╝██║██████╔╝██║   ██║   ██║   ");
console.log("██╔══██╗██╔══╝  ██╔═══╝ ██║██╔═══╝ ██║██╔══██╗██║   ██║   ██║   ");
console.log("██║  ██║███████╗██║     ██║██║     ██║██████╔╝╚██████╔╝   ██║   ");
console.log("╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚═╝     ╚═╝╚═════╝  ╚═════╝    ╚═╝   ");
console.log("                                                                ");

db.pruebaconexion();

console.log("Bot iniciado, indexando insultos en idioma español :)");

