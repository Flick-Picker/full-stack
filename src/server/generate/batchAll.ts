import * as batch from './batchTradional';
import * as batchAnime from './batchAnime';
import * as batchGenre from './batchGenres';

const sleep = (ms: number) => (
  new Promise((resolve) => setTimeout(resolve, ms)));

/**
 * Calls each of the external APIs to retrieve updated information about movies, tv shows,
 * and anime.
 */
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
