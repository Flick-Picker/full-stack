import * as fs from 'fs';
import tvList from '../api-json/tv_batch.json';
import movieList from '../api-json/movie_batch.json';
import animeTV from '../api-json/anime_tv_batch.json';
import animeMovie from '../api-json/anime_movie_batch.json';
import movieGenres from '../api-json/movie_genres.json';
import tvGenres from '../api-json/tv_genres.json';

export const getGenres = async () => {
  const finalGenres = new Set<string>();
  tvList.forEach((tvShow: any) => {
    tvShow.genre_ids.forEach((genreID: any) => {
      tvGenres.genres.forEach((genre: any) => {
        if (genre.id === genreID) {
          genre.name.split('&').forEach((name: any) => {
            finalGenres.add(name.trim().toLowerCase());
          });
        }
      });
    });
  });
  movieList.forEach((movie: any) => {
    movie.genre_ids.forEach((genreID: any) => {
      movieGenres.genres.forEach((genre: any) => {
        if (genre.id === genreID) {
          finalGenres.add(genre.name.toLowerCase());
        }
      });
    });
  });
  animeTV.forEach((show: any) => {
    show.genres.forEach((genre: any) => {
      finalGenres.add(genre.name.toLowerCase());
    });
  });
  animeMovie.forEach((movie: any) => {
    movie.genres.forEach((genre: any) => {
      finalGenres.add(genre.name.toLowerCase());
    });
  });
  fs.writeFile('../static/genres.json', JSON.stringify(Array.from(finalGenres)), (err: any) => {
    if (err) console.log(err);
  });
};

