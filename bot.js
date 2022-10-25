//
// Made with Twit by Raul
//
const { fork } = require('child_process');
var intervalo = 60/* Minutes */ * 60 /* Seconds */ * 1000;


module.exports = { intervalo };

fork("./badwords.js");

console.log("                                                                ");
console.log("██████╗ ███████╗██████╗ ██╗██████╗ ██╗██████╗  ██████╗ ████████╗");
console.log("██╔══██╗██╔════╝██╔══██╗██║██╔══██╗██║██╔══██╗██╔═══██╗╚══██╔══╝");
console.log("██████╔╝█████╗  ██████╔╝██║██████╔╝██║██████╔╝██║   ██║   ██║   ");
console.log("██╔══██╗██╔══╝  ██╔═══╝ ██║██╔═══╝ ██║██╔══██╗██║   ██║   ██║   ");
console.log("██║  ██║███████╗██║     ██║██║     ██║██████╔╝╚██████╔╝   ██║   ");
console.log("╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚═╝     ╚═╝╚═════╝  ╚═════╝    ╚═╝   ");
console.log("                                                                ");
console.log("Bot iniciado, indexando insultos en idioma español :)");