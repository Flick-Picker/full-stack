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
    // Cumulative rating
    let sumRating = 0;

    // Score the movie based on the liked and disliked genres
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
    sumRating += genreRating;

    // Score the movie based in the preferred ratings
    let isRatingHighEnough = 0;
    if (movie.rating >= preferences.preferredRatings + 1) {
      isRatingHighEnough = 1;
    } else if (movie.rating < preferences.preferredRatings - 1) {
      isRatingHighEnough = -1;
    }
    sumRating += isRatingHighEnough;

    // Score the anime movie based on the runtime preferences
    let runtimeRating = -1;
    if (Math.abs(movie.runtime - preferences.runtimePreference) < 15) {
      runtimeRating = 1;
    } else if (Math.abs(movie.runtime - preferences.runtimePreference) < 30) {
      runtimeRating = 0;
    }
    sumRating += runtimeRating;

    // Score the anime movie based on the recent release preference
    let recentReleaseRating = 0;
    if (!(preferences.recentReleasePreference === 0)) {
      if (movie.year < 2013) {
        recentReleaseRating = -1;
      } else if (movie.year < 2017) {
        recentReleaseRating = 0;
      } else {
        recentReleaseRating = 1;
      }
    }
    sumRating += recentReleaseRating * Math.sqrt(preferences.recentReleasePreference);

    // Score the anime movie based on the year range preference
    let yearRangeRating = 0;
    if (!(preferences.yearRangePreference == null) && !(preferences.yearRangePreference[0] === 0)) {
      const lower = preferences.yearRangePreference[0];
      const upper = preferences.yearRangePreference[1];
      if (lower == null || upper == null) {
        yearRangeRating = 0;
      } else if (movie.year > lower && movie.year < upper) {
        yearRangeRating = 2;
      } else if (movie.year > lower - 5 && movie.year < upper + 5) {
        yearRangeRating = 1;
      }
    }
    sumRating += yearRangeRating;

    // Score the anime movie based on the popularity preference
    let popularityRating = 0;
    const high = 10000;
    const medium = 1000;
    if (!(preferences.popularityPreference === 0)) {
      if (movie.numberOfVotes > high) {
        popularityRating = 2;
      } else if (movie.numberOfVotes > medium) {
        popularityRating = 1;
      }
    }
    sumRating += popularityRating * Math.sqrt(preferences.popularityPreference);

    const rating = (sumRating) * Math.sqrt(preferences.moviePreference);
    if (rating > 0) {
      batch.push(new RecommendationObject(movie.name, movie.imageURL, rating));
    }
  });
  return batch;
};

const tvShowAlgorithm = async (preferences: PreferenceObject) => {
  const batch: RecommendationObject[] = [];
  tvShows.forEach((tvShow) => {
    // Cumulative rating
    let sumRating = 0;

    // Score tv show based on the liked and disliked genres
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
    sumRating += genreRating;

    // Score tv show based on the preferred rating
    let isRatingHighEnough = 0;
    if (tvShow.rating >= preferences.preferredRatings + 1) {
      isRatingHighEnough = 1;
    } else if (tvShow.rating < preferences.preferredRatings - 1) {
      isRatingHighEnough = -1;
    }
    sumRating += isRatingHighEnough;

    // Score the anime movie based on the runtime preferences
    let runtimeRating = -1;
    if (Math.abs(tvShow.runtime - preferences.runtimePreference) < 15) {
      runtimeRating = 1;
    } else if (Math.abs(tvShow.runtime - preferences.runtimePreference) < 30) {
      runtimeRating = 0;
    }
    sumRating += runtimeRating;

    // Score the anime movie based on the recent release preference
    let recentReleaseRating = 0;
    if (!(preferences.recentReleasePreference === 0)) {
      if (tvShow.year < 2013) {
        recentReleaseRating = -1;
      } else if (tvShow.year < 2017) {
        recentReleaseRating = 0;
      } else {
        recentReleaseRating = 1;
      }
    }
    sumRating += recentReleaseRating * Math.sqrt(preferences.recentReleasePreference);

    // Score the anime movie based on the year range preference
    let yearRangeRating = 0;
    if (!(preferences.yearRangePreference == null) && !(preferences.yearRangePreference[0] === 0)) {
      const lower = preferences.yearRangePreference[0];
      const upper = preferences.yearRangePreference[1];
      if (lower == null || upper == null) {
        yearRangeRating = 0;
      } else if (tvShow.year > lower && tvShow.year < upper) {
        yearRangeRating = 2;
      } else if (tvShow.year > lower - 5 && tvShow.year < upper + 5) {
        yearRangeRating = 1;
      }
    }
    sumRating += yearRangeRating;

    // Score the anime movie based on the popularity preference
    let popularityRating = 0;
    const high = 10000;
    const medium = 1000;
    if (!(preferences.popularityPreference === 0)) {
      if (tvShow.numberOfVotes > high) {
        popularityRating = 2;
      } else if (tvShow.numberOfVotes > medium) {
        popularityRating = 1;
      }
    }
    sumRating += popularityRating * Math.sqrt(preferences.popularityPreference);

    const rating = (sumRating) * Math.sqrt(preferences.tvShowPreference);
    if (rating > 0) {
      batch.push(new RecommendationObject(tvShow.name, tvShow.imageURL, rating));
    }
  });
  return batch;
};

const animeTVAlgorithm = async (preferences: PreferenceObject) => {
  const batch: RecommendationObject[] = [];
  animeTV.forEach((animeTVShow) => {
    let sumRating = 0;
    let genreRating = 0;
    animeTVShow.genres.forEach((curAnimeTVGenre) => {
      let isGenreLiked = 0;
      if (preferences.likedGenres.includes(curAnimeTVGenre.toLowerCase())) {
        isGenreLiked = 1;
      }
      if (isGenreLiked !== 1) {
        if (preferences.dislikedGenres.includes(curAnimeTVGenre.toLowerCase())) {
          isGenreLiked = -1;
        }
      }
      genreRating += isGenreLiked;
    });
    sumRating += genreRating;

    let isRatingHighEnough = 0;
    if (animeTVShow.rating >= preferences.preferredRatings + 1) {
      isRatingHighEnough = 1;
    } else if (animeTVShow.rating < preferences.preferredRatings - 1) {
      isRatingHighEnough = -1;
    }
    sumRating += isRatingHighEnough;

    // Score the anime tv show based on the runtime preferences
    let runtimeRating = -1;
    if (Math.abs(animeTVShow.runtime - preferences.runtimePreference) < 15) {
      runtimeRating = 1;
    } else if (Math.abs(animeTVShow.runtime - preferences.runtimePreference) < 30) {
      runtimeRating = 0;
    }
    sumRating += runtimeRating;

    // Score the anime tv show based on the recent release preference
    let recentReleaseRating = -1;
    if (!(preferences.recentReleasePreference === 0)) {
      if (animeTVShow.year < 2013) {
        recentReleaseRating = -1;
      } else if (animeTVShow.year < 2017) {
        recentReleaseRating = 0;
      } else {
        recentReleaseRating = 1;
      }
    }
    sumRating += recentReleaseRating * Math.sqrt(preferences.recentReleasePreference);

    // Score the anime tv show based on the year range preference
    let yearRangeRating = 0;
    if (!(preferences.yearRangePreference == null) && !(preferences.yearRangePreference[0] === 0)) {
      const lower = preferences.yearRangePreference[0];
      const upper = preferences.yearRangePreference[1];
      if (lower == null || upper == null) {
        yearRangeRating = 0;
      } else if (animeTVShow.year > lower && animeTVShow.year < upper) {
        yearRangeRating = 2;
      } else if (animeTVShow.year > lower - 5 && animeTVShow.year < upper + 5) {
        yearRangeRating = 1;
      }
    }
    sumRating += yearRangeRating;

    // Score the anime tv show based on the popularity preference
    let popularityRating = 0;
    const high = 10000;
    const medium = 1000;
    if (!(preferences.popularityPreference === 0)) {
      if (animeTVShow.numberOfVotes > high) {
        popularityRating = 2;
      } else if (animeTVShow.numberOfVotes > medium) {
        popularityRating = 1;
      }
    }
    sumRating += popularityRating * Math.sqrt(preferences.popularityPreference);

    const rating = (sumRating) * Math.sqrt(preferences.animePreference);
    if (rating > 0) {
      batch.push(new RecommendationObject(animeTVShow.name, animeTVShow.imageURL, rating));
    }
  });
  return batch;
};

const animeMovieAlgorithm = async (preferences: PreferenceObject) => {
  const batch: RecommendationObject[] = [];
  animeMovies.forEach((animeMovie) => {
    let sumRating = 0;

    // Score the anime movie based on the liked and disliked genre preferences
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
    sumRating += genreRating;

    // Score the anime movie based on the rating relative to the preferred rating
    let isRatingHighEnough = 0;
    if (animeMovie.rating >= preferences.preferredRatings + 1) {
      isRatingHighEnough = 1;
    } else if (animeMovie.rating < preferences.preferredRatings - 1) {
      isRatingHighEnough = -1;
    }
    sumRating += isRatingHighEnough;

    // Score the anime movie based on the runtime preferences
    let runtimeRating = -1;
    if (Math.abs(animeMovie.runtime - preferences.runtimePreference) < 15) {
      runtimeRating = 1;
    } else if (Math.abs(animeMovie.runtime - preferences.runtimePreference) < 30) {
      runtimeRating = 0;
    }
    sumRating += runtimeRating;

    // Score the anime movie based on the recent release preference
    let recentReleaseRating = 0;
    if (!(preferences.recentReleasePreference === 0)) {
      if (animeMovie.year < 2013) {
        recentReleaseRating = -1;
      } else if (animeMovie.year < 2017) {
        recentReleaseRating = 0;
      } else {
        recentReleaseRating = 1;
      }
    }
    sumRating += recentReleaseRating * Math.sqrt(preferences.recentReleasePreference);

    // Score the anime movie based on the year range preference
    let yearRangeRating = 0;
    if (!(preferences.yearRangePreference == null) && !(preferences.yearRangePreference[0] === 0)) {
      const lower = preferences.yearRangePreference[0];
      const upper = preferences.yearRangePreference[1];
      if (lower == null || upper == null) {
        yearRangeRating = 0;
      } else if (animeMovie.year > lower && animeMovie.year < upper) {
        yearRangeRating = 2;
      } else if (animeMovie.year > lower - 5 && animeMovie.year < upper + 5) {
        yearRangeRating = 1;
      }
    }
    sumRating += yearRangeRating;

    // Score the anime movie based on the popularity preference
    let popularityRating = 0;
    const high = 10000;
    const medium = 1000;
    if (!(preferences.popularityPreference === 0)) {
      if (animeMovie.numberOfVotes > high) {
        popularityRating = 2;
      } else if (animeMovie.numberOfVotes > medium) {
        popularityRating = 1;
      }
    }
    sumRating += popularityRating * Math.sqrt(preferences.popularityPreference);

    const rating = (sumRating) * Math.sqrt(preferences.animePreference);
    if (rating > 0) {
      batch.push(new RecommendationObject(animeMovie.name, animeMovie.imageURL, rating));
    }
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
  console.log(`algorithm called with unknown type: ${type}`);
  return [];
};
