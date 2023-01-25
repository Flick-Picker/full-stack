/* eslint-disable no-await-in-loop */
import fs from 'fs';
import * as animeapi from '../services/anime-api';

const sleep = (ms: number) => (
  new Promise((resolve) => setTimeout(resolve, ms)));

const retrieveBatch = async (mediatype: string) => {
  let batch: any[] = [];
  for (let i = 1; i <= 10; i += 1) {
    const currpage = await animeapi.topAnimes(mediatype, i);
    batch = batch.concat(currpage.data);
    await sleep(1000); // to avoid rate limiting
    console.log(`finished page ${i}`);
  }
  fs.writeFile(`../static/anime_${mediatype}_batch.json`, JSON.stringify(batch), (err) => {
    if (err) console.log(err);
  });
};

console.log('Starting batches...');
retrieveBatch('movie');
retrieveBatch('tv');
console.log('Finished batches!');
