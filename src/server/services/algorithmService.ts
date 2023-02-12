import animeTV from '../static/anime_tv.json';
import animeMovies from '../static/anime_movies.json';
import movies from '../static/movies.json';
import tvShows from '../static/tvShows.json';
import RecommendationObject from '../classes/recommendationObject';
import PreferenceObject from '../classes/preferenceObject';

export const movieType = 1;
export const tvShowType = 2;
export const animeTVType = 3;
export const animeMovieType = 4;

const movieAlgorithm = async (preferences: PreferenceObject) => {
  const batch: RecommendationObject[] = [];
  movies.forEach((movie) => {
    let genreRating = 0;
    movie.genres.forEach((currMovieGenre) => {
      let isGenreLiked = 0;
      preferences.likedGenres.forEach((likedGenre) => {
        if (likedGenre === currMovieGenre) {
          isGenreLiked = 1;
        }
      });
      if (isGenreLiked !== 1) {
        preferences.dislikedGenres.forEach((dislikedGenre) => {
          if (dislikedGenre === currMovieGenre) {
            isGenreLiked = -1;
          }
        });
      }
      genreRating += isGenreLiked;
    });
    let isRatingHighEnough = 0;
    if (movie.rating >= preferences.preferredRatings + 1) {
      isRatingHighEnough = 1;
    } else if (movie.rating < preferences.preferredRatings - 1) {
      isRatingHighEnough = -1;
    }

    const rating = genreRating + isRatingHighEnough;
    batch.push(new RecommendationObject(movie.name, movie.imageURL, rating));
  });
  return batch;
};

const tvShowAlgorithm = async (preferences: PreferenceObject) => {
  const batch: RecommendationObject[] = [];
  tvShows.forEach((tvShow) => {
    let genreRating = 0;
    tvShow.genres.forEach((curTVGenre) => {
      let isGenreLiked = 0;
      preferences.likedGenres.forEach((likedGenre) => {
        if (likedGenre === curTVGenre) {
          isGenreLiked = 1;
        }
      });
      if (isGenreLiked !== 1) {
        preferences.dislikedGenres.forEach((dislikedGenre) => {
          if (dislikedGenre === curTVGenre) {
            isGenreLiked = -1;
          }
        });
      }
      genreRating += isGenreLiked;
    });
    let isRatingHighEnough = 0;
    if (tvShow.rating >= preferences.preferredRatings + 1) {
      isRatingHighEnough = 1;
    } else if (tvShow.rating < preferences.preferredRatings - 1) {
      isRatingHighEnough = -1;
    }

    const rating = genreRating + isRatingHighEnough;
    batch.push(new RecommendationObject(tvShow.name, tvShow.imageURL, rating));
  });
  return batch;
};

const animeTVAlgorithm = async (preferences: PreferenceObject) => {
  const batch: RecommendationObject[] = [];
  animeTV.forEach((animeTVShow) => {
    let genreRating = 0;
    animeTVShow.genres.forEach((curAnimeTVGenre) => {
      let isGenreLiked = 0;
      preferences.likedGenres.forEach((likedGenre) => {
        if (likedGenre === curAnimeTVGenre) {
          isGenreLiked = 1;
        }
      });
      if (isGenreLiked !== 1) {
        preferences.dislikedGenres.forEach((dislikedGenre) => {
          if (dislikedGenre === curAnimeTVGenre) {
            isGenreLiked = -1;
          }
        });
      }
      genreRating += isGenreLiked;
    });
    let isRatingHighEnough = 0;
    if (animeTVShow.rating >= preferences.preferredRatings + 1) {
      isRatingHighEnough = 1;
    } else if (animeTVShow.rating < preferences.preferredRatings - 1) {
      isRatingHighEnough = -1;
    }

    const rating = genreRating + isRatingHighEnough;
    batch.push(new RecommendationObject(animeTVShow.name, animeTVShow.imageURL, rating));
  });
  return batch;
};

const animeMovieAlgorithm = async (preferences: PreferenceObject) => {
  const batch: RecommendationObject[] = [];
  animeMovies.forEach((animeMovie) => {
    let genreRating = 0;
    animeMovie.genres.forEach((curAnimeMovieGenre) => {
      let isGenreLiked = 0;
      preferences.likedGenres.forEach((likedGenre) => {
        if (likedGenre === curAnimeMovieGenre) {
          isGenreLiked = 1;
        }
      });
      if (isGenreLiked !== 1) {
        preferences.dislikedGenres.forEach((dislikedGenre) => {
          if (dislikedGenre === curAnimeMovieGenre) {
            isGenreLiked = -1;
          }
        });
      }
      genreRating += isGenreLiked;
    });
    let isRatingHighEnough = 0;
    if (animeMovie.rating >= preferences.preferredRatings + 1) {
      isRatingHighEnough = 1;
    } else if (animeMovie.rating < preferences.preferredRatings - 1) {
      isRatingHighEnough = -1;
    }

    const rating = genreRating + isRatingHighEnough;
    batch.push(new RecommendationObject(animeMovie.name, animeMovie.imageURL, rating));
  });
  return batch;
};

export const algorithm = async (type: number, preferences: PreferenceObject) => {
  if (type === movieType) {
    // call movie algo
    return movieAlgorithm(preferences);
  }
  if (type === tvShowType) {
    // call TV show algo
    return tvShowAlgorithm(preferences);
  }
  if (type === animeTVType) {
    // call anime TV algo
    return animeTVAlgorithm(preferences);
  }
  if (type === animeMovieType) {
    // call anime movie algo
    return animeMovieAlgorithm(preferences);
  }
  return [];
};
