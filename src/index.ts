import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cron from "node-cron"; // Import node-cron
import { postRandomWordTweet } from "./job";
import path from "path";
import logger from "./logger";

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

// API key is expected in the 'X-API-KEY' header
app.get("/insultar", async (req: Request, res: Response) => {
  const apiKey = req.header("X-API-KEY");

  if (apiKey && apiKey === process.env.API_BOT_KEY) {
    try {
      const response = await postRandomWordTweet();
      logger.info("Successfully posted a tweet via /insultar endpoint.");
      res.status(200).json({ response });
    } catch (error) {
      logger.error("Error posting tweet via /insultar endpoint:", error);
      res.status(500).json({ message: "Error posting tweet" });
    }
  } else {
    logger.warn(
      "Unauthorized attempt to access /insultar. Missing or incorrect X-API-KEY header.",
    );
    res.status(401).json({ message: "Unauthorized" });
  }
});

app.get("/", (req: Request, res: Response) => {
  // Removed async
  try {
    res.sendFile(path.join(__dirname, "../favicon.ico"));
    res.status(200);
  } catch (error) {
    logger.error("Error serving favicon:", error);
    res.status(500).send("Error serving favicon");
  }
});

app.listen(port, () => {
  logger.info(`⚡️[server]: Server is running at http://localhost:${port}`);

  // Schedule hourly tweets
  cron.schedule("0 * * * *", () => {
    // Removed async from callback
    logger.info("Hourly tweet job triggered.");
    postRandomWordTweet()
      .then(() => {
        logger.info("Scheduled tweet posted successfully.");
      })
      .catch((error) => {
        logger.error("Error during scheduled tweet:", error);
      });
  });

  logger.info(
    "Hourly tweet scheduler initialized. Tweets will be posted at the start of every hour.",
  );
});
