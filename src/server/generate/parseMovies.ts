import fs from 'fs';
import movieList from '../api-json/movie_batch.json';
import MovieObject from '../classes/movieObject';
import movieGenres from '../api-json/movie_genres.json';

const Movie = { runtime: 130 };

/**
 * Parses the genre(s) of a movie into an array based on the provided IDs
 * @param genreIDs the genre ID(s) of the movie from the external API
 */
function parseMovieGenres(genreIDs: number[]) {
  const genres = new Set<string>();
  genreIDs.forEach((genreID) => {
    let foundGenre = false;
    movieGenres.genres.forEach((genre: any) => {
      if (genre.id === genreID) {
        genres.add(genre.name.toLowerCase());
        foundGenre = true;
      }
    });
    if (!foundGenre) {
      console.log('could not find genre');
    }
  });
  return Array.from(genres);
}

/**
 * Parses the movie api-json and creates anime tv objects. The goal is to
 * reduce the amount of data present by only including needed data. Some data requires
 * some separate mapping (see parseMovieGenres).
 */
export const getMovies = async () => {
  const movies: MovieObject[] = [];
  movieList.forEach((movie) => {
    // Everything should have a release date so the '2009-' should never be used
    const releasedate = movie.release_date ? movie.release_date : '2009-';
    const imgURL = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`;
    const genres = parseMovieGenres(movie.genre_ids);
    movies.push(new MovieObject(
      movie.title,
      genres,
      imgURL,
      movie.vote_average,
      movie.vote_count,
      movie.popularity,
      Number.parseInt(releasedate.substring(0, releasedate.indexOf('-')), 10),
      Movie.runtime,
    ));
  });

  fs.writeFile('../static/movies.json', JSON.stringify(movies), (err) => {
    if (err) console.log(err);
  });
};
