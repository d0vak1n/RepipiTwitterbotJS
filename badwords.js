var fs = require('fs');

function getDataSet(filelang){
    arraybadwords = fs.readFileSync('./dataset/'+filelang+'.txt').toString().split("\n");
    return arraybadwords;
}

module.exports = { getDataSet }