import fs from 'fs';
import tvList from '../api-json/tv_batch.json';
import TVObject from '../classes/tvObject';
import tvGenres from '../api-json/tv_genres.json';

const tvshow = { runtime: 25 };

/**
 * Parses the genre(s) of a tv show into an array based on the provided IDs
 * @param genreIDs the genre ID(s) of the tv show from the external API
 */
function parseTVGenres(genreIDs: number[]) {
  const genres = new Set<string>();
  genreIDs.forEach((genreID) => {
    let foundGenre = false;
    tvGenres.genres.forEach((genre) => {
      if (genre.id === genreID) {
        foundGenre = true;
        genre.name.split('&').forEach((name) => {
          genres.add(name.trim().toLowerCase());
        });
      }
    });
    if (!foundGenre) {
      console.log('could not find genre for tv show');
    }
  });
  return Array.from(genres);
}

/**
 * Parses the tv show api-json and creates anime tv objects. The goal is to
 * reduce the amount of data present by only including needed data. Some data requires
 * some separate mapping (see parseMovieGenres).
 */
export const getTVShows = async () => {
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
      Number.parseInt(tvShow.first_air_date ? tvShow.first_air_date.substring(0, tvShow.first_air_date.indexOf('-')) : '2009', 10),
      tvshow.runtime,
    ));
  });

  fs.writeFile('../static/tvShows.json', JSON.stringify(tvShows), (err) => {
    if (err) console.log(err);
  });
};
