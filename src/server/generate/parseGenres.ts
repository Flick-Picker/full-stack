import fs from 'fs';
import tvList from '../api-json/tv_batch.json';
import movieList from '../api-json/movie_batch.json';
import animeTV from '../api-json/anime_tv_batch.json';
import animeMovie from '../api-json/anime_movie_batch.json';
import movieGenres from '../api-json/movie_genres.json';
import tvGenres from '../api-json/tv_genres.json';

export const getGenres = async () => {
  const finalGenres = new Set<string>();
  tvList.forEach((tvShow) => {
    tvShow.genre_ids.forEach((genreID) => {
      tvGenres.genres.forEach((genre) => {
        if (genre.id === genreID) {
          genre.name.split('&').forEach((name) => {
            finalGenres.add(name.trim().toLowerCase());
          });
        }
      });
    });
  });
  movieList.forEach((movie) => {
    movie.genre_ids.forEach((genreID) => {
      movieGenres.genres.forEach((genre) => {
        if (genre.id === genreID) {
          finalGenres.add(genre.name.toLowerCase());
        }
      });
    });
  });
  animeTV.forEach((show) => {
    show.genres.forEach((genre) => {
      finalGenres.add(genre.name.toLowerCase());
    });
  });
  animeMovie.forEach((movie) => {
    movie.genres.forEach((genre) => {
      finalGenres.add(genre.name.toLowerCase());
    });
  });
  fs.writeFile('../static/genres.json', JSON.stringify(Array.from(finalGenres)), (err) => {
    if (err) console.log(err);
  });
};

