import express, { Express, Request, Response, } from "express";
import dotenv from "dotenv";
import { twitAndRetwitWord } from "./job";
import path from "path";

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

app.get("/", async (req: Request, res: Response) => {

  res.sendFile(path.join(__dirname, '../favicon.ico'));
  res.status(200);

});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
