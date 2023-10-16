import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {twitAndRetwitWord} from './job';


dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.get('/insultar/:auth?', (req: Request, res: Response) => {
    const auth = req.params.auth;

    if (auth == `${process.env.API_BOT_KEY}`) {
        twitAndRetwitWord();
        res.send('Éxito!!');
    }


 twitAndRetwitWord();

});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});