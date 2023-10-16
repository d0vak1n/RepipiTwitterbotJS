# RepipiTwitterBot

---

## License <a name='license'></a>

This porjects operates under:
**The General Public License (GPL).**
![Badge](https://www.whitesourcesoftware.com/wp-content/media/2021/04/aHViPTcyNTE0JmNtZD1pdGVtZWRpdG9yaW1hZ2UmZmlsZW5hbWU9aXRlbWVkaXRvcmltYWdlXzVjNDk3NmFlNDM5Y2QucG5nJnZlcnNpb249MDAwMCZzaWc9NDQ0MzgxMTNmN2U3NDliM2U1MGE2ZjNkNzA2YzU5NDA.png)

More infomration for this license can be found _[HERE](https://www.whitesourcesoftware.com/resources/blog/open-source-licenses-explained/#GNU_General_Public_License_GPL)_

## Table of Content

- [RepipiTwitterBot](#repipitwitterbot)
  - [License ](#license-)
  - [Table of Content](#table-of-content)
  - [Description ](#description-)
  - [Installation Process ](#installation-process-)
  - [Usage ](#usage-)

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

## Usage <a name='usage'></a>

.env is required with this template:

```
API_KEY="appKey"
API_SECRET="appSecret"
ACCESS_TOKEN="accessToken"
ACCESS_SECRET="accessSecret"
```

Then you dont need to edit:

```javascript
import TwitterApi from "twitter-api-v2";
import dotenv from "dotenv";

export const T = new TwitterApi({
  appKey: `${process.env.API_KEY}`,
  appSecret: `${process.env.API_SECRET}`,
  // Following access tokens are not required if you are
  // at part 1 of user-auth process (ask for a request token)
  // or if you want a app-only client (see below)
  accessToken: `${process.env.ACCESS_TOKEN}`,
  accessSecret: `${process.env.ACCESS_SECRET}`,
});
```
