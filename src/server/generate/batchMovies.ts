import fs from 'fs';
import * as movieapi from '../services/movie-api';

const retrieveBatch = async (mediatype: string, genre: string) => {
  let batch: any[] = [];
  for (let i = 1; i <= 10; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const currpage = await movieapi.discoverMedia(mediatype, genre, i);
    batch = batch.concat(currpage.results);
  }
  fs.writeFile(`../static/${mediatype}_batch.json`, JSON.stringify(batch), (err) => {
    if (err) console.log(err);
  });
};

console.log('Starting batches...');
retrieveBatch('movie', '');
retrieveBatch('tv', '');
console.log('Finished batches!');
