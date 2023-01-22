import express, { Express, Request, Response } from 'express';

const genre = require('./routes/genre');

const app: Express = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Flick Picker API');
});

app.use('/api/genres', genre);

module.exports = app;
