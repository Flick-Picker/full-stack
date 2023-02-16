import express, { Express, Request, Response } from 'express';

const cors = require('cors');

const genre = require('./routes/genre');
const user = require('./routes/user');
const pref = require('./routes/pref');
const group = require('./routes/group');
const invite = require('./routes/invite');
const voteSession = require('./routes/voteSession');
const recommendations = require('./routes/recommendation');

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
app.use('/api/invites', invite);
app.use('/api/voting', voteSession);
app.use('/api/rec', recommendations);

module.exports = app;
