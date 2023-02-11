import fs from 'fs';
import movieList from '../static/movie_batch.json';
import MovieObject from '../classes/movieObject';
import movieGenres from '../static/movie_genres.json';

function parseMovieGenres(genreIDs: number[]) {
  const genres = new Set<string>();
  genreIDs.forEach((genreID) => {
    movieGenres.genres.forEach((genre) => {
      if (genre.id === genreID) {
        genres.add(genre.name);
      }
    });
  });
  return Array.from(genres);
}

const getMovies = async () => {
  const movies: MovieObject[] = [];
  movieList.forEach((movie) => {
    const imgURL = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`;
    const genres = parseMovieGenres(movie.genre_ids);
    movies.push(new MovieObject(
      movie.title,
      genres,
      imgURL,
      movie.vote_average,
      movie.vote_count,
      movie.popularity,
      movie.release_date,
    ));
  });

  fs.writeFile('../static/movies.json', JSON.stringify(movies), (err) => {
    if (err) console.log(err);
  });
};

console.log('Parsing movies...');
getMovies();
console.log('Finished parsing movies!');
