var Twit = require('twit')
const auth = require('./config')
const bdwds = require('./badwords');

var arraybadwords; 




arraybadwords = bdwds.getDataSet("ESP")

console.log(arraybadwords);

 
auth.T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {

  data => {}
  console.log(data)
})
