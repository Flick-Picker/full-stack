import * as fs from 'fs';
import * as movieapi from '../services/movieService';

/**
 * Calls the traditional media API to retrieve information about movies or tv shows.
 * @param mediatype either 'tv' or 'movie' depending on which traditional media type is desired.
 */
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
