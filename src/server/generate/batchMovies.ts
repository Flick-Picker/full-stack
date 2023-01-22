/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
// import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// const app: Express = express();
// const port = process.env.PORT || 8080;
const TMDB_KEY = process.env.TMDB_KEY || '';
const TMDB_API_URL = 'https://api.themoviedb.org/3';

const discoverMedia = async (mediatype: string, genres: string, page: string) => {
  try {
    const requrl = `${TMDB_API_URL}/discover/${mediatype}`;
    const media = await axios.get(requrl, {
      params: {
        api_key: TMDB_KEY,
        language: 'en-US',
        sort_by: 'popularity.desc',
        with_genres: genres,
        with_original_language: 'en',
        page,
      },
    }).then((resp) => resp.data);
    return media;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const retrieveBatch = async (mediatype: string, genre: string) => {
  let batch: any[] = [];
  for (let i = 1; i <= 2; i++) {
    const currpage = await discoverMedia(mediatype, genre, i.toString());
    batch = batch.concat(currpage.results);
  }
  fs.writeFile(`../static/${mediatype}.json`, JSON.stringify(batch), (err) => {
    if (err) console.log(err);
  });
};

console.log('Starting batch...');
retrieveBatch('movie', '28');
console.log('Finished batch!');
