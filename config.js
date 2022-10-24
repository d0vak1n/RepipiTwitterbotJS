var Twit = require('twit');

var T = new Twit({
  consumer_key:         'zRTztz400ZoTV4usvfZTtFAT5',
  consumer_secret:      'BS7tdDQHR2W7gYGruYmeOKufhbSz2k3qfGAkME6LjOsOasEcjT',
  access_token:         '1583402583502241793-tZWPfBrdVdgiIMNxZpf8FTz29Apxir',
  access_token_secret:  'C5fHxdnmoYqvkUvRgAqO7CPjmENPXt2AnMyvcxP3kT41q',
  timeout_ms:           60*60*1000,  // optional HTTP request timeout to apply to all requests
  strictSSL:            false,     // optional - requires SSL certificates to be valid
})

module.exports = { T };