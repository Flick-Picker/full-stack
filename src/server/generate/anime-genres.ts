import fs from 'fs';
import AnimeGenre from '../classes/animeGenre';
import GenreObject from '../classes/genreObject';
import animeMovies from '../static/anime_movie_batch.json';
import animeTV from '../static/anime_tv_batch.json';

const getAnimeGenres = async () => {
  const genreNameSet = new Set<string>();

  animeMovies.forEach((anime) => {
    anime.genres.forEach((genre) => {
      genreNameSet.add(genre.name.toLowerCase());
    });
  });

  animeTV.forEach((anime) => {
    anime.genres.forEach((genre) => {
      genreNameSet.add(genre.name.toLowerCase());
    });
  });

  const genres: AnimeGenre[] = [];
  let nameCounter = 1;
  genreNameSet.forEach((name) => {
    genres.push(new AnimeGenre(nameCounter, name));
    nameCounter += 1;
  });

  fs.writeFile('../static/anime_genres.json', JSON.stringify(new GenreObject(genres)), (err) => {
    if (err) console.log(err);
  });
};

console.log('Getting anime genres...');
getAnimeGenres();
console.log('Finished getting anime genres!');
