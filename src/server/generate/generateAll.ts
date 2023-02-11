import * as animeTV from './parseAnimeTV';
import * as animeMovies from './parseAnimeMovies';
import * as movies from './parseMovies';
import * as TV from './parseTV';
import * as genres from './parseGenres';

const generateAllFiles = async () => {
  animeTV.getAnimeTv();
  animeMovies.getAnimeMovie();
  movies.getMovies();
  TV.getTVShows();
  genres.getGenres();
};

console.log('Generating all files...');
generateAllFiles();
console.log('Generating all files!');
