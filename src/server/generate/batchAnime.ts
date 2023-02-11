/* eslint-disable no-await-in-loop */
import fs from 'fs';
import * as animeapi from '../services/animeService';

const sleep = (ms: number) => (
  new Promise((resolve) => setTimeout(resolve, ms)));

export const retrieveBatch = async (mediatype: string) => {
  let batch: any[] = [];
  for (let i = 1; i <= 10; i += 1) {
    const currpage = await animeapi.topAnimes(mediatype, i);
    batch = batch.concat(currpage.data);
    await sleep(2000); // to avoid rate limiting
    console.log(`finished page ${i} for ${mediatype}`);
  }
  fs.writeFile(`../api-json/anime_${mediatype}_batch.json`, JSON.stringify(batch), (err) => {
    if (err) console.log(err);
  });
};
