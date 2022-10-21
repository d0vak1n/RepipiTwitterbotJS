var Twit = require('twit')
const auth = require("./config")

 
auth.T.get('search/tweets', { q: 'gilipollas since:2011-07-11', count: 10 }, function(err, data, response) {
  console.log(data)
})
