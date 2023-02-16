import { getGroupPrefs, getPref } from './prefService';
import PreferenceObject from '../classes/preferenceObject';
import RecommendationObject from '../classes/recommendationObject';
import {
  algorithm, movieType, tvShowType, animeTVType, animeMovieType,
} from './algorithmService';

const compileGroupPreferences = async (id: string) => {
  const groupPreferences = await getGroupPrefs(id);
  const likedGenreCount = new Map();
  const dislikedGenreCount = new Map();
  let sumPrefRating = 0;
  let sumMoviePref = 0;
  let sumTVPref = 0;
  let sumAnimePref = 0;

  groupPreferences.forEach((preference) => {
    // Entertainment type preferences
    sumMoviePref += preference.moviePreference;
    sumTVPref += preference.tvShowPreference;
    sumAnimePref += preference.animePreference;

    // Rating preference
    sumPrefRating += preference.preferredRatings;

    // Genre preferences
    preference.likedGenres.forEach((genre) => {
      if (likedGenreCount.has(genre)) {
        likedGenreCount.set(genre, likedGenreCount.get(genre) + 1);
      } else {
        likedGenreCount.set(genre, 1);
      }
    });
    preference.dislikedGenres.forEach((genre) => {
      if (dislikedGenreCount.has(genre)) {
        dislikedGenreCount.set(genre, dislikedGenreCount.get(genre) + 1);
      } else {
        dislikedGenreCount.set(genre, 1);
      }
    });
  });
  const finalLikedGenres: string[] = [];
  const finalDislikedGenres: string[] = [];
  likedGenreCount.forEach((LGCount, likedGenre) => {
    if (dislikedGenreCount.has(likedGenre)) {
      const DGCount = dislikedGenreCount.get(likedGenre);
      if (LGCount > DGCount) {
        finalLikedGenres.push(likedGenre);
      } else if (LGCount < DGCount) {
        finalDislikedGenres.push(likedGenre);
      }
    } else {
      finalLikedGenres.push(likedGenre);
    }
  });
  dislikedGenreCount.forEach((filler, dislikedGenre) => {
    if (!likedGenreCount.has(dislikedGenre)) {
      finalDislikedGenres.push(dislikedGenre);
    }
  });

  return new PreferenceObject(
    finalLikedGenres,
    finalDislikedGenres,
    sumPrefRating / groupPreferences.length,
    sumMoviePref / groupPreferences.length,
    sumTVPref / groupPreferences.length,
    sumAnimePref / groupPreferences.length,
  );
};

export const getRecommendation = async (id: string, group: boolean) => {
  let preferences: PreferenceObject;
  if (group) {
    preferences = await compileGroupPreferences(id);
  } else {
    preferences = await getPref(id);
  }
  let batch: RecommendationObject[] = [];
  if (preferences.moviePreference >= 1) {
    batch = batch.concat(await algorithm(movieType, preferences));
  }
  if (preferences.tvShowPreference >= 1) {
    batch = batch.concat(await algorithm(tvShowType, preferences));
  }
  if (preferences.animePreference >= 1) {
    batch = batch.concat(await algorithm(animeTVType, preferences));
    batch = batch.concat(await algorithm(animeMovieType, preferences));
  }
  // sort the algorithm ratings in desc order
  batch.sort((a, b) => b.algorithmRating - a.algorithmRating);
  return batch.slice(0, 20);
};
