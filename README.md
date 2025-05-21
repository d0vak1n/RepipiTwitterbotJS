# RepipiTwitterBot

---

## License <a name='license'></a>

This project operates under the **ISC License**.

## Table of Contents

- [RepipiTwitterBot](#repipitwitterbot)
  - [License](#license)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Project Setup](#project-setup)
  - [Running the Bot](#running-the-bot)
  - [Usage](#usage)
    - [Environment Variables](#environment-variables)
    - [Manual Tweet Trigger](#manual-tweet-trigger)

---

## Description <a name='description'></a>

RepipiTwitterBot is a Node.js application built with TypeScript that automatically posts a Spanish "bad word" (insult) to Twitter every hour. It also provides an HTTP endpoint to manually trigger a tweet.

---

## Project Setup <a name='project-setup'></a>

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/d0vak1n/repipitwitterbotjs.git
    cd repipitwitterbotjs
    ```

2.  **Install dependencies:**
    It's recommended to use Node.js version 21 or higher.
    ```bash
    npm ci
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the project root. See the [Environment Variables](#environment-variables) section for the required template.

---

## Running the Bot <a name='running-the-bot'></a>

Once the project is set up, you can start the bot using:

```bash
npm run start-api
```

The bot will automatically:
- Start an HTTP server (typically on port 3000, configurable via `PORT` environment variable).
- Post a tweet to Twitter at the start of every hour using an internal scheduler.
- Load the dataset of words from `./dataset/ESP.txt` upon startup.

Docker instructions for building and running the image (if you prefer containerization):
The `Dockerfile` and `docker-compose.yml` are provided.
```bash
# Build the image
docker build -t repipitwitterbotjs .

# Run using docker-compose (uses .env file for environment variables)
docker-compose up -d

# Or run directly with Docker, manually passing environment variables
# (replace placeholders with actual values from your .env file)
docker run -d --name repipitwitterbotjs \
  -e API_BOT_KEY="YOUR_API_BOT_KEY" \
  -e PORT="3000" \
  -e API_KEY="YOUR_TWITTER_API_KEY" \
  -e API_SECRET="YOUR_TWITTER_API_SECRET" \
  -e ACCESS_TOKEN="YOUR_TWITTER_ACCESS_TOKEN" \
  -e ACCESS_SECRET="YOUR_TWITTER_ACCESS_SECRET" \
  -p 3000:3000 \
  repipitwitterbotjs
```
The existing `docker push d0vak1n/repipitwitterbotjs:tagname` instruction seems to be for publishing the image to a registry and is not directly part of the local setup/running process.

---

## Usage <a name='usage'></a>

### Environment Variables <a name='environment-variables'></a>

A `.env` file is required in the project root with the following template:

```env
# Key for authorizing manual tweet requests via the API
API_BOT_KEY="yourSecureApiBotKey"

# Port for the HTTP server
PORT="3000"

# Twitter API v2 Application-Only Bearer Token is NOT used.
# The bot uses OAuth 1.0a User Context for tweeting.
# Ensure your Twitter App has Read & Write permissions.

# Twitter API v1.1 (OAuth 1.0a) User Context Access Keys
# These are required for posting tweets.
API_KEY="yourTwitterAppApiKey"
API_SECRET="yourTwitterAppApiSecret"
ACCESS_TOKEN="yourTwitterUserAccessToken"
ACCESS_SECRET="yourTwitterUserAccessSecret"
```

### Manual Tweet Trigger <a name='manual-tweet-trigger'></a>

You can manually trigger the bot to post a tweet using the `/insultar` endpoint. This requires authentication via an API key passed in the `X-API-KEY` header.

-   **Method:** `GET`
-   **Endpoint:** `/insultar`
-   **Authentication:** `X-API-KEY` header containing the value of your `API_BOT_KEY` environment variable.

**Example using `curl`:**

Replace `YOUR_API_BOT_KEY_VALUE` with the actual value from your `.env` file and `PORT_NUMBER` with the port the server is running on (e.g., 3000).

```bash
curl -X GET -H "X-API-KEY: YOUR_API_BOT_KEY_VALUE" http://localhost:PORT_NUMBER/insultar
```

A successful request will return a JSON response with the ID of the posted tweet, e.g., `{"response":{"datatweet":"1234567890123456789"}}`. An unsuccessful or unauthorized request will return an appropriate error message and status code.
The bot uses `twitter-api-v2` with OAuth 1.0a credentials, so ensure your Twitter app has "Read and Write" permissions.

---
