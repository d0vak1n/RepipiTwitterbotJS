 # RepipiTwitterBot
  * * *

  
  ## License <a name='license'></a>
  This porjects operates under:
  **The General Public License (GPL).**
  ![Badge](https://www.whitesourcesoftware.com/wp-content/media/2021/04/aHViPTcyNTE0JmNtZD1pdGVtZWRpdG9yaW1hZ2UmZmlsZW5hbWU9aXRlbWVkaXRvcmltYWdlXzVjNDk3NmFlNDM5Y2QucG5nJnZlcnNpb249MDAwMCZzaWc9NDQ0MzgxMTNmN2U3NDliM2U1MGE2ZjNkNzA2YzU5NDA.png) 

  More infomration for this license can be found *[HERE](https://www.whitesourcesoftware.com/resources/blog/open-source-licenses-explained/#GNU_General_Public_License_GPL)* 
    

  ## Table of Content
  1. [Description](#descrption)
  2. [Installation](#installation)
  3. [Usage Tips](#usage)
  4. [Questions](#questions)
  * * *

  ## Description <a name='description'></a>
  Publish a badword every hour in spanish and retweet the last 2 tweets with that word.
  * * *

  ## Installation Process <a name='installation'></a>
  Run:

	npm i

  Then start with:
  
  	node bot.js
	
  * * *

  ## Usage <a name='usage'></a>
 ```javascript
var Twit = require('twit')

var T = new Twit ({
  consumer_key: '',
  consumer_secret: '',
  access_token: '',
  access_token_secret: '',
  timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL: false,     // optional - requires SSL certificates to be valid.
})
```

  * * *

  ## Sequence Diagram <a name='diagram'></a>

  ```seq
  Note right of Repipi: Pick a random insult
  Repipi-->Twitter: Get search query of that insult
  Twitter-> Repipi: Last 2 tweets with that insult
  Repipi-->Twitter: RT last 2 tweets
  Repipi->Twitter: Tweet which word we picked
  ```
  * * *


  ## Questions <a name='questions'></a>

  ### Github Page
  Message me on Github: 
  > [ruliniyo](https://github.com/ruliniyo) 
