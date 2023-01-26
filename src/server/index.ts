import express, { Express, Request, Response } from 'express';

const genre = require('./routes/genre');

const profile = require('./routes/profile');

const app: Express = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Flick Picker API');
});

app.use('/api/genres', genre);
app.use('/api/profile', profile);

module.exports = app;
