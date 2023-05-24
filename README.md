# RepipiTwitterBot

---

## License <a name='license'></a>

This porjects operates under:
**The General Public License (GPL).**
![Badge](https://www.whitesourcesoftware.com/wp-content/media/2021/04/aHViPTcyNTE0JmNtZD1pdGVtZWRpdG9yaW1hZ2UmZmlsZW5hbWU9aXRlbWVkaXRvcmltYWdlXzVjNDk3NmFlNDM5Y2QucG5nJnZlcnNpb249MDAwMCZzaWc9NDQ0MzgxMTNmN2U3NDliM2U1MGE2ZjNkNzA2YzU5NDA.png)

More infomration for this license can be found _[HERE](https://www.whitesourcesoftware.com/resources/blog/open-source-licenses-explained/#GNU_General_Public_License_GPL)_

## Table of Content

1. [Description](#descrption)
2. [Installation](#installation)
3. [Usage Tips](#usage)
4. [Questions](#questions)

---

## Description <a name='description'></a>

Publish a spanish badword every hour and retweet the last 2 tweets with that word.

---

## Installation Process <a name='installation'></a>

Run:

    npm i

Then start after usage tips with:

    npm run start

---

## Usage (change the "changethistoconfig.ts" to "config.ts")<a name='usage'></a>

```javascript
var Twit = require("twit");

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
```

---

## Sequence Diagram <a name='diagram'></a>

![Sequence diagram](https://ramoweb.com/wp-content/uploads/2022/10/capturadiagrama.png "Sequence diagram")

---
