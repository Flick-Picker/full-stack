import * as batch from './batchMovies';
import * as batchAnime from './batchAnime';
import * as batchGenre from './batchGenres';

const sleep = (ms: number) => (
  new Promise((resolve) => setTimeout(resolve, ms)));

const allBatch = async () => {
  await batch.retrieveBatch('tv');
  await batch.retrieveBatch('movie');
  await batchAnime.retrieveBatch('movie');
  await sleep(2000);
  await batchAnime.retrieveBatch('tv');
  await batchGenre.retrieveBatch();
};

console.log('Starting batches...');
allBatch();
console.log('Finished batches!');
