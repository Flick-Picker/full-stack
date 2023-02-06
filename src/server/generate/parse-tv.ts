import fs from 'fs';
import tvList from '../static/tv_batch.json';
import TVObject from '../classes/tvObject';
import tvGenres from '../static/tv_genres.json';

function parseTVGenres(genreIDs: number[]) {
  const genres = new Set<string>();
  genreIDs.forEach((genreID) => {
    tvGenres.genres.forEach((genre) => {
      if (genre.id === genreID) {
        genres.add(genre.name);
      }
    });
  });
  return Array.from(genres);
}

const getTVShows = async () => {
  const tvShows: TVObject[] = [];
  tvList.forEach((tvShow) => {
    const imgURL = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${tvShow.poster_path}`;
    const genres = parseTVGenres(tvShow.genre_ids);
    tvShows.push(new TVObject(
      tvShow.name,
      genres,
      imgURL,
      tvShow.vote_average,
      tvShow.vote_count,
      tvShow.popularity,
      tvShow.first_air_date,
    ));
  });

  fs.writeFile('../static/tvShows.json', JSON.stringify(tvShows), (err) => {
    if (err) console.log(err);
  });
};

console.log('Parsing movies...');
getTVShows();
console.log('Finished parsing movies!');
