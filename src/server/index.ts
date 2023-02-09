import express, { Express, Request, Response } from 'express';

const cors = require('cors');

const genre = require('./routes/genre');
const user = require('./routes/user');
const pref = require('./routes/pref');
const group = require('./routes/group');

const app: Express = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Flick Picker API');
});

app.use('/api/genres', genre);
app.use('/api/user', user);
app.use('/api/user/pref', pref);
app.use('/api/group', group);

module.exports = app;
