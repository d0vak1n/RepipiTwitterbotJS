var fs = require('fs');

function getDataSet(filelang){
    arraypal = fs.readFileSync('./dataset/'+filelang+'.txt').toString().split("\n");
    return arraypal;
}

module.exports = { getDataSet };