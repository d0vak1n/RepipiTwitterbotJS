import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { twitAndRetwitWord } from "./job";

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.get("/insultar/:auth?", async (req: Request, res: Response) => {
  const auth = req.params.auth;

  if (auth == `${process.env.API_BOT_KEY}`) {
    const response = await twitAndRetwitWord();
    res.status(200).json({ response });
  } else {
    console.log("Alguien esta intentando acceder Ò.Ó");
    res.status(401).json({ message: "Unauthorized" });
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
