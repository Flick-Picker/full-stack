import * as fs from 'fs';
import * as movieapi from '../services/movieService';

export const retrieveBatch = async (mediatype: string) => {
  let batch: any[] = [];
  for (let i = 1; i <= 10; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const currpage = await movieapi.discoverMedia(mediatype, i);
    batch = batch.concat(currpage.results);
  }
  fs.writeFile(`../api-json/${mediatype}_batch.json`, JSON.stringify(batch), (err: any) => {
    if (err) console.log(err);
  });
};
